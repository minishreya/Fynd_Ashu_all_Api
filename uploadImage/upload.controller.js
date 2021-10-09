const uploadService = require("./upload.service")
const multer = require("multer")
const fs = require("fs")

var details

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads")
        }
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      details = file
    }
  })
  
const upload = multer({ storage: storage })

const uploadImage = (req, res) => {
    console.log(details.originalname)
    console.log(details)
    uploadService.upload(details.originalname).then((url) => {
        res.render('home', {url})
        //res.send({imageurl: url})
    }).catch(() => {
        res.send({message: "Unable to upload image"})
    })
}

module.exports = {
    uploadImage,
    upload
}