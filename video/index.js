const express = require("express")
const router = express.Router()
const authService = require("../auth.service")
const videoController = require("./video.controller")

router.post("/upload", videoController.upload.single('file'), videoController.uploadVideo)

module.exports = router 