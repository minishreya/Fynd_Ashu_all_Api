const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const videoSchema = new Schema({
    videoid: {type: String},
    title: {type: String, required: true},
    file: {type: String, required: true},
    coverurl: {type: String},
    duration: {type: Number},
    audio: {type: String, default: "No audio"},
    cast: {type: String, default: "unknown"},
    rating: {type: Number, default: 5}
})

const videoModel = Mongoose.model("videos", videoSchema)

module.exports =  videoModel 