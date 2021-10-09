const express = require("express")
const router = express.Router()

router.post("/addproduct", (req, res) => {
    console.log("Inside add products")
    res.send("Inside products")
})

module.exports = router