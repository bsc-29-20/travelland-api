const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Request Body parsing Middleware

const dbConnection = require('./src/utils/mysql.connector')
const { query } = require('express')

const {User} = require('./src/users/users.model')


//get users to the database
app.get('/api/users', function (req, res) {
    var sql = "SELECT * FROM users"
    return dbConnection.query(sql, function (err, result) {
        if (err) throw err;

        return res.json(result)
    })
})

//post users to the database
app.post('/api/users', function (req, res) {
    
    const {userid, username, email, phone_number, address, age, gender} = req.body
    var sql = `INSERT INTO users(userid, username, email, phone_number, address, age, gender) VALUES ('${userid}','${username}','${email}','${phone_number}','${address}','${age}','${gender}')`;
        
    return dbConnection.query(sql, function (err, result) { 
        if (err) throw err;
        
        return res.json(result)
     });
})

 app.listen(5000, function(){
    console.log('TravelLand is listening on port 3000')

    dbConnection.connect( function (err){
        if (err) throw err
        
        console.log("Connected to MySQL")
    })

})