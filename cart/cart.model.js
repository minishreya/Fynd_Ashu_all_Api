const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const CartSchema = new Schema({
    email: {type: String, required: true},
    productid: {type: String, required: true},
    quantity: {type: Number, default: 1}
})

const CartModel = Mongoose.model("carts", CartSchema)

module.exports =  CartModel 