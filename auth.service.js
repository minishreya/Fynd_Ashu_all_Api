const jwt = require("jsonwebtoken")
const userService = require("./user/user.service")


const verifyToken = (token) => {
    //console.log("Token is ---------->       ", data)
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', (err, result) => {
            if (err) {
                //console.log("error is ", err)
                reject()
            } else {
                //console.log("result is ", result)
                resolve(result)
            }
        })
    })   
}

const isAthorised = (req, res, next) => {
    console.log("Inside isLoggedIn", req.get("token"))
    loginToken = req.get("token")
    verifyToken(loginToken).then((payload) => {
        console.log("Payload  ", payload)
        if(isAdmin(payload)) {
            next()
        } else {
            res.send({message: "Unauthorised user"})
        }
        
    }).catch(() => {
        console.log("User unauthrised")
        res.send("Internal server error")
    })
}

const isAdmin = (payload) => {
    if (payload.data.role == "admin") {
        return true
    } else {
        return false
    }
}

const isLoggedIn = (req, res, next) => {
    loginToken = req.get("token")
    verifyToken(loginToken).then((payload) => {
        console.log("Payload  ", payload)
        if (payload.data.email == req.body.email) {
            next()
        } else {
            res.send({message: "User not logged in!"})
        }
    }).catch((err) => {
        res.send({err})
    })
}

module.exports = {
    isAthorised,
    isLoggedIn
}