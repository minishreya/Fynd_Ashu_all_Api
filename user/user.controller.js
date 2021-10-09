const userService = require("./user.service")
const mailer = require("../mail.service")
const Usermodel = require("./user.model") 

const registerUser = (req, res) => {

    //console.log(req.body)
    userService.addUser(req.body).then(() => {
        body = req.body
        token = userService.createToken(req.body)
        console.log(body, token)
        var url = "http://localhost:3000/user/verify?token="+token
        var emailDetails = mailer.setBody(req.body.email, url)

        console.log("Email details ", emailDetails)
        mailer.sendMail(emailDetails).then(() => {
            console.log("Inside sendMail then")
            res.set("verificationToken", token)
            res.send("Verification email sent")
        }).catch(() => {
            console.log("Inside sendMail catch")
            res.send("Internal server error")
        })
    }).catch((err) => {
        if(err.code == 11000) {
            return res.status(409).send("Email already registered")
        }
        res.status(500).send("Internal server error")
    })
}

var loginToken
var currUser
 
const loginUser = (req, res) => {
    userService.login(req.body).then(() => {
        currUser = req.body
        userService.findUser(req.body).then((data) => {
            loginToken = userService.createToken(data)
            console.log("Login token  //////", loginToken)
            res.set("token", loginToken)
            res.send("Login successfully done")
        }).catch(() => {
            res.send({message:"Unable to login"})
        })
        //console.log(loginToken)
    }).catch(() => { 
       // console.log("There was an error")
        res.send("Interal server error")
    })
}

const verifyUser = (req, res) => {
    var token = req.query.token
    console.log("verification token ", token)
    userService.verifyToken(token).then((result) => {
        userService.verifyuser(result.data ,token, (err, resul) => {
            if (err) {
                //console.log("Error in verifying the user")
                res.send("Unable to verify user")
            } else {
                console.log("User verified", resul)
                res.send({
                    message:"User verified"
                })  
            }
        }) 
    }).catch(() => {
        res.send({
            message:"User not verified"
        })
    })
}

const getAllUsers = (req, res) => {
    //console.log("Inside getAllUsers" ,loginToken)
    userService.findUser(currUser).then((result) => {
        if (result.role == "admin") {
            userService.verifyToken(req.query).then(() => {
                Usermodel.find({}).then((data) => {
                    console.log(data)
                    res.send(data)
                }).catch(() => {
                    res.send("Internal server error")
                })
            }).catch(() => {
                res.send("Internal server error")
            })
        } else {
            console.log("User is not authorised")
            res.send("NOT Authorised")
        }
    }).catch(() => {
        console.log("User is not admin")
    })
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    getAllUsers
}