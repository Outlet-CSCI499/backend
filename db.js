const { Client } = require("pg") // import Client from node postgres package
const { getDatabaseUri } = require("./config")
require("colors") // pretty terminal output

const db = new Client({ connectionString: getDatabaseUri() }) // passing database Uri as an object

db.connect((err) => { // call clients.connect method passing callback that logs info to screen
    if (err) {
        console.error("connection error".red, err.stack)
    } else {
        console.log("Successfully connected to postgres db!".blue)
    }
})

module.exports = db // export