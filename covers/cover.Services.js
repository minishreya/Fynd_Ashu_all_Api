const coverModel = require("./cover.model")

const addData = (data) => {
    data.coverid = (new Date().getTime()).toString(15)
    return new Promise((resolve, reject) => {
        const model = new coverModel(data)

        model.save().then(() => {
            console.log("Inside addData then ????")
            resolve(data)
        }).catch(() => {
            console.log("Inside addData then ????")
            reject() 
        })
    })    
}

const fetchCovers = (query) => {
    var projection  = {coverid:1,title:1,price:1,model:1,company:1,type:1,color:1,image:1}
    return new Promise((resolve, reject) => {
        coverModel.find(query, projection).then((data) => {
            console.log(data)
            resolve(data)
        }).catch(() => {
            reject() 
        })
    }) 
}

const findCoverDetails  = function(id){
    return new Promise(function(resolve,reject){
        var query = {
            coverid:id
        }
        coverModel.find(query).then(function(result){
            console.log("findinf the cover details from db" , result)
            resolve(result)
        } , function(error){
            console.log(" error infindinf the cover details from db" , error)
            reject(error)
        })
    })
}

const deleteCoverDetails = (id) => {
    return new Promise(function(resolve,reject){
        var query = {
            coverid:id
        }
        coverModel.findOneAndDelete(query).then(function(data){
            console.log("Deleted the cover details from db" , data)
            if(data) {
                resolve(data)
            } else {
                reject("No such cover found")
            }
        } , function(error){
            console.log(" error in finding the cover details from db" , error)
            reject(error)
        })
    })
}
 
const updateCoverDetails = (id, body) => {
    console.log("Body ", body)
    return new Promise(function(resolve,reject){
        var query = {
            coverid:id
        }
        var updateQuery = {
            $set:body
        }
        console.log(updateQuery)
        coverModel.findOneAndUpdate(query, updateQuery).then(function(data){
            console.log("Updated the cover details from db" , data)
            if(data) {
                resolve(data)
            } else {
                reject("No such cover found")
            }  
        } , function(error){
            console.log(" error in updating the cover details from db" , error)
            reject(error)
        })
    })
}

module.exports = {
    addData,
    fetchCovers,
    findCoverDetails,
    deleteCoverDetails,
    updateCoverDetails
}