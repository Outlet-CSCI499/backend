const db = require("../db")
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class User {
    static async login(credentials) {
        // users should submit email and password
        // if any of those fields are missing, throw an error

        // lookup user in the db by email, if found compare the password
        // with password in the db, if a match return the user

        // if this fails, throw an error
        throw new UnauthorizedError("Invalid email or password")
    }

    static async signup(credentials) {
        // user should submit their email, password, first name, and username
        // if any fields are missing, throw an error
        const requiredFields = ["password", "first_name", "email", "username"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
			throw new BadRequestError("Invalid email.");
        }
        
        // make sure there isn't an existing user in the db with the same email
        // if there is, throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        // take user's password and hash it 
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        // take user's email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()

        // create new user in the db with all their info
        // return the user

        const result = await db.query(`
            INSERT INTO users (
                password,
                first_name,
                email,
                username
            )
            VALUES ($1, $2, $3, $4)
            RETURNING id, first_name, email, username, created_at;
        `, [hashedPassword, credentials.first_name, lowercasedEmail, credentials.username]
        )

        // return the user
        const user = result.rows[0]

        return user
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
    
}

module.exports = User