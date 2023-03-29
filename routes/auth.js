const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.post("/login", async (req, res, next) => {
    try {
        // take users email and password and attempt to authenticate
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    } catch(err) {
        next(err)
    }
})

router.post("/signup", async (req, res, next) => {
    try{
        // take users email and password and create a new user in our database
        const user = await User.signup(req.body)
        return res.status(201).json({ user }) // 201 means created
    } catch(err) {
        next(err)
    }
})

module.exports = router