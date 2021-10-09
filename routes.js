const express = require("express")
const router = express.Router()
const userroutes = require("./user")
const productsroute = require("./products")
const coverroute = require("./covers")
const uploadImage = require("./uploadImage")
const cart = require("./cart")
const video = require("./video")

router.use("/user", userroutes)

router.use("/products", productsroute)

router.use("/cover", coverroute)

router.use("/upload", uploadImage)

router.use("/cart", cart)

router.use("/video", video)

module.exports = router