const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const CoverSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: true},
    model: {type: String, required: true},
    company: {type: String, required: true},
    coverid: {type: String},
    type: {type: String, default: "Back cover"},
    quantity: {type: Number, default: 1},
    description: {type: String },
    image: {type: String}, 
    images: {type: String},
    rating: {type: Number, default: 5},
    material: {type: String, required: true}
})

const CoverModel = Mongoose.model("covers", CoverSchema)

module.exports =  CoverModel