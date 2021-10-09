const express = require("express")
const { route } = require("../products")
const userController = require("./user.controller")
const router = express.Router()

router.post("/register", userController.registerUser)

router.post("/login", userController.loginUser)

router.get("/allusers", userController.getAllUsers)

router.get("/verify", userController.verifyUser)

module.exports = router 