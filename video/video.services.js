const VideoModel = require("./video.model")

const addData = (filename, data) => {
    data.file = filename
    console.log("Data -------->", data, filename)
    const video = new VideoModel(data)

    var query = {
        title: data.title,
        file: filename
    }
    return new Promise((resolve, reject) => {

        VideoModel.find(query).then((result) => {
            console.log(result)
            if(result.length == 0) {
                video.save().then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            } else {
                reject("Video already present")
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    addData
}