const express = require("express")
const router = express.Router()
const uploadController = require("./upload.controller.js")


router.post("/image", uploadController.upload.single('file'), uploadController.uploadImage)


module.exports = router