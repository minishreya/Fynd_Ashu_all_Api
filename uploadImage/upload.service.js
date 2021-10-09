var cloudinary = require('cloudinary').v2
const path = require("path")

const upload = (filename) => {

    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: "dz0yaecxs",
            api_key: "184326487576423",
            api_secret: "xUIeQDlPEgo49v3ebbx9gjHuG5c"
        })
    
        console.log("Uploading...")
        console.log(__dirname + "/uploads/" + filename)
        var filepath = path.resolve(__dirname + "/../uploads/" + filename)
        cloudinary.uploader.upload(filepath, {
            resource_type: "image"
        }).then((data) => {
            console.log("Uploaded")
            resolve(data.secure_url)
        }).catch((err) => {
            console.log(err)
            reject()
        })
        
    }) 
}

module.exports = {
    upload
}