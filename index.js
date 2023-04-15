const express = require('express')
const app = express()

const bodyParser = require('body-parser')
// Request Body parsing Middleware

const dbConnection= require('./src/utils/mysql.connector')

const post = require('./src/posts/posts.model')

app.get('/api/v1', function(req, res) {
    return res.json(req.headers)
})

app.get('/api/v1/posts', function(req, res) {
    return res.json([posts])
})

app.listen(5000, function(){
    console.log('TravelLand is listening on port 3000')

    dbConnection.connect( function (err){
        
        console.log("Connected to MySQL")
    })

})