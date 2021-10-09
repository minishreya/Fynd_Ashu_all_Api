const coverServices = require("./cover.Services")

const createCover = (req, res) => {
    coverServices.addData(req.body).then((data) => {
        console.log("Data added into db")
        res.send({message: "Cover created", data})
    }).catch(() => {
        res.send({message: "Error occured in creating cover"})
    })
}
   
const findCover = (req, res) => {
    if (req.query.coverid && Object.keys(req.query).length == 1) {
        //console.log("Inside if")
        coverServices.findCoverDetails(req.query.coverid).then((data) => {
            res.render('coverdetails', {data})
            //res.send(data)
        }).catch(() => {
            res.send({message: "Internal server error"})
        })
    } else {
        //console.log("Inside else")
        coverServices.fetchCovers(req.query).then((data) => {
            res.render('coverdetails', {data})
            //res.send(data)
        }).catch(() => {
            res.send({message: "Internal server error"})
        })
    }
}

const deleteCover = (req, res) => {
    //console.log("COver id is ", req.query.id)
    coverServices.deleteCoverDetails(req.query.coverid).then((data) => {
        res.send({message: "Deleted record", details: data})
    }).catch((err) => {
        res.send({message: "Internal server error", err})
    })
} 
 
const updateCover = (req, res) => {
    //console.log("COver id is ", req.query.id)
    coverServices.updateCoverDetails(req.query.coverid, req.body).then((data) => {
        res.send({message: "Updated record", details: data})
    }).catch((err) => {
        res.send({message: "Internal server error", err})
    })
}

const findAllCovers = (req, res) => {
    coverServices.fetchCovers({}).then((data) => {
        res.render('coverdetails', {data})
    }).catch(() => {

    })
}


module.exports = {
    createCover,
    findCover,
    deleteCover,
    updateCover,
    findAllCovers
}