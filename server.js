const express = require("express")
const routes = require("./routes")
const bodyparser = require("body-parser")
const port = process.env.PORT || 3000
const Mongoose = require("mongoose")

//const dburl = "mongodb://localhost:27017/fyndnodedb"
const dburl = "mongodb://localhost:27017/fyndtestAllUser"


const server = express()

server.use(bodyparser.json())
server.use(routes)

server.set('view engine', 'ejs');

Mongoose.connect(dburl).then(function(){
        console.log("Connetcted to database")

        server.listen(port, () => {
        console.log("Server running on ", port)
        })

    }, function(error){
        console.log("Error in connecting to mongodb")
})


