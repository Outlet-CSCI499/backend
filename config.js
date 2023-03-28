require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

// process.env:
// nodejs exposes process object as a global variable and provides info about and control over the current executing node process
// more than process.env attributes on a process object, but only care about process.env 
function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "outlet"


    // if the DATABASE_URL environment variable, use that,
    // otherwise create the db connection string ourselves
    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`

}

console.log("process.env".yellow, Object.keys(process.env))
console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    getDatabaseUri,
}