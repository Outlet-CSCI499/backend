const express = require("express")
const morgan = require("morgan") // morgan pkg allows us to log activity in our app

const app = express()

app.use(morgan("tiny"))

const port = 3000

app.listen(port, () => {
    console.log(`Server listening on port ` + port)
})