const cartServices = require("./cart.services")

const addItems = (req, res) => {
    cartServices.add(req.body).then((data) => {
        res.send({message: "Item added into cart", data})
    }).catch((err) => {
        res.send({err})
    })
}

const allItems = (req, res) => {
    cartServices.getUserItems(req.body).then((productsIds) => {
        res.send({message: "All products in cart", productsIds})
    }).catch((err) => {
        res.send({err})
    })
}

const removeItems = (req, res) => {
    cartServices.removeCartItem(req.body).then((item) => {
        res.send({message: "Removed item ", item})
    }).catch((err) => {
        res.send({err})
    })
}

const deleteItems = (req, res) => {
    cartServices.deleteCartItem(req.body).then((item) => {
        if (item.deletedCount == 0) {
            res.send({message: "No such item present in cart "})
        }
        res.send({message: "Deleted item " + req.body.productid, item})
    }).catch((err) => {
        res.send({err})
    })
}

module.exports = {
    addItems,
    allItems,
    removeItems,
    deleteItems
} 