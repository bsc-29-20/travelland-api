const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Request Body parsing Middleware

const dbConnection = require('./src/utils/mysql.connector')

const user = require('./src/users/user.router')



 app.listen(5000, function(){
    console.log('TravelLand is listening on port 3000')

    dbConnection.connect( function (err){
        if (err) throw err
        
        console.log("Connected to MySQL")
    })

})