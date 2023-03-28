const db = require("../db")

const { UnauthorizedError } = require("../utils/errors")

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

        // make sure there isn't an existing user in the db with the same email
        // if there is, throw an error

        // take user's password and hash it 
        // take user's email and lowercase it

        // create new user in the db with all their info
        // return the user
    }
}