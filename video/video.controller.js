const videoService = require("./video.services")
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

const uploadVideo = (req, res) => {
    console.log(req.query)
    videoService.addData(details.originalname, req.body).then((data) => {
        //res.render('home', {details: data})
        res.send({message: "Success", data})
    }).catch((err) => {
        //res.render('home', {details: err})
        res.send({message: "Error", err})
    })
}

module.exports = {
    uploadVideo,
    upload
}