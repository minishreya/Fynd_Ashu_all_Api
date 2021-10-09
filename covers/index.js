const express = require("express")
const router = express.Router()
const coverController = require("./cover.Controller")
const authService = require("../auth.service")
 
router.post("/create", authService.isAthorised, coverController.createCover)

router.post("/find", coverController.findCover)

router.get("/allcovers", coverController.findAllCovers)

router.get("/delete", authService.isAthorised, coverController.deleteCover)

router.post("/update", authService.isAthorised, coverController.updateCover)


module.exports = router