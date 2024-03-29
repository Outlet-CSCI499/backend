const express = require("express")
const cors = require("cors")
const morgan = require("morgan") // morgan pkg allows us to log activity in our app
const { PORT } = require("./config")
const authRoutes = require("./routes/auth")
const postsRouter = require("./routes/posts")
const newsRouter = require("./routes/news")
const repliesRouter = require("./routes/replies")
const { NotFoundError } = require("./utils/errors")

const app = express()

app.use(cors()) // enables cross-origin resource sharing for all origins that may not be on this port
app.use(morgan("tiny")) // log request info
app.use(express.json()) // parse incoming JSON request bodies

app.use("/auth", authRoutes)
app.use("/posts", postsRouter)
app.use("/news", newsRouter)
app.use("/replies", repliesRouter)
// if endpoint that user sends a http request to doesn't match any endpoints in our 
// app, it will call this middleware which will call next function with a new not found error
app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use("/auth", authRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message
    
    return res.status(status).json({
        error: {message, status},
    })
})

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`)
})