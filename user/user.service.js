const Usermodel = require("./user.model")
const jwt = require("jsonwebtoken")

const addUser = (data) => {
    console.log("Data ------------", data)
    return new Promise((resolve, reject) => {
        const user = new Usermodel(data)
        
        user.save().then((data) => {
            console.log("Data is inside addUser", data)
            resolve()
        }).catch((err) => {
            console.log("Internal server error ", err)
            reject(err)
        })
    })
}

const login = (data) => {
    const credentials = {
        email: data.email,
        password: data.password
    }

    //console.log(credentials)

    return new Promise((resolve, reject) => {
     
        Usermodel.findOne(credentials).then((result) => {
            //console.log("Found record ----> ",  result)
            resolve()
        }).catch(() => {
            //console.log("Error occured ---------")
            reject()
        })
    })
}

const createToken = (data) => {
    var token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
      }, 'secret');

    return token
} 

const verifyuser = (data, token, callback) => {
    console.log("Data in verify function ", data)
    var findQuery = {
        email: data.email
    }

    var updateQuery = {
        $set: {
            verified: true
        }
    }

    jwt.verify(token, 'secret', (err, res) => {

        if(err) {
            //console.log("Inside err in verify function ", err)
            callback(err, null)
        } else {
            //console.log("Verified user" ,res)

            Usermodel.findOneAndUpdate(findQuery, updateQuery, (error) => {
                if (error) {
                    //console.log("Error in updatig verified status")
                } else {
                    console.log("Verified status updated")
                    callback(null, res)
                }
            })
        }
    })
}

const verifyToken = (data) => {
    //console.log("Token is ---------->       ", data)
    return new Promise((resolve, reject) => {
        jwt.verify(data, 'secret', (err, result) => {
            if (err) {
                //console.log("error is ", err)
                reject()
            } else {
                //console.log("result is ", result)
                console.log("Toke payload verified data ", result)
                resolve(result)
            }
        })
    })   
}

const findUser = (data) => {
    return new Promise((resolve, reject) => {
        Usermodel.findOne(data, (err, result) => {
            if(err) {
                reject()
            } else if(!result){
                reject()
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    addUser,
    login,
    createToken,
    verifyuser,
    verifyToken,
    findUser
}
