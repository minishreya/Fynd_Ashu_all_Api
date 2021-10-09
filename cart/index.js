const express = require("express")
const router = express.Router()
const cartController = require("./cart.controller")
const authService = require("../auth.service")
 
router.post("/addItem", authService.isLoggedIn, cartController.addItems)

router.post("/removeItem", authService.isLoggedIn, cartController.removeItems)

router.post("/allItems", authService.isLoggedIn, cartController.allItems)

router.post("/deleteItem", authService.isLoggedIn, cartController.deleteItems)

module.exports = router 