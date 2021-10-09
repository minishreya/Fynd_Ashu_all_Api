const cartModel = require("./cart.model")

const add = (data) => {
    const cart = new cartModel(data)

    return new Promise((resolve, reject) => {

        var query = {
            email: data.email,
            productid: data.productid
        }

        cartModel.find(query).then((item) => {
            if (item[0]) {
                query.quantity = item[0].quantity + 1
                updateCartItem(query).then((item) => {
                    resolve(item)
                }).catch((err) => {
                    reject(err)
                })
            } else {
                cart.save().then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }
        }).catch((err) => {
            reject(err)
        })
    })
} 

const getUserItems = (data) => {
    var query = {email: data.email}
    return new Promise ((resolve, reject) => {
        cartModel.find(query).then((data) => {
            var products = []
            data.forEach((each) => {
                products.push(each.productid)
            })
            resolve(products)
        }).catch((err) => {
            reject(err)
        })
    })
}

const removeCartItem = (data) => {
    var query = {
        email: data.email,
        productid: data.productid
    }

    //console.log("Query is -------------->", query)
    return new Promise((resolve, reject) => {

        cartModel.find(query).then((item) => {
            console.log("More then 1 quantity ", item)
            if (item[0].quantity > 1) {
                query.quantity = item[0].quantity - 1
                updateCartItem(query).then((item) => {
                    resolve(item)
                }).catch((err) => {
                    reject(err)
                })
            } else if (item[0].quantity == 1) {
                cartModel.findOneAndDelete(query).then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

const updateCartItem = (query) => {
    return new Promise((resolve, reject) => {
        cartModel.findOneAndUpdate(query).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

const deleteCartItem = (data) => {
    //console.log("Data is ------------>", data)
    return new Promise((resolve, reject) => {
        cartModel.deleteOne(data).then((item) => {
            resolve(item)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    add,
    getUserItems,
    removeCartItem  ,
    deleteCartItem  
}