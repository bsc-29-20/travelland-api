const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Request Body parsing Middleware

const dbConnection = require('./src/utils/mysql.connector')
const {query} = require('express')

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

//Update users using patch
app.patch('/api/users/:userid', function (req, res) {
    
    const sql = `SELECT * FROM posts WHERE userid=${req.params.userid} LIMIT 1`

    return dbConnection.query(sql, function (err, rows) {
        if (err) throw err

        const user = request.body
        
        if (rows.length >= 1) {
            let props = ''

            props = Object.keys(user).map((key, index) => {
                               
                return props += `${[key]}='${Object.values(user).at(index)}',`
            })
            
            const updateSql = `UPDATE posts SET ${props[props.length - 1].slice(0, -1)} WHERE userid=${rows[0].userid}`
            
            return dbConnection.query(updateSql, function (err, result) {
                return res.json(rows[0])
            })
        } else {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: `User with userid ${request.params.userid} does not exist.`
            })
        }
    })
})

//method to get a single user in the database 
app.get('/api/users/:userid', function(req,res){
    //Logic for get a single user from the database if the userid exists, return to the client app
    const sql = `SELECT * FROM users WHERE userid=${req.params.userid} LIMIT 1`

    dbConnection.query(sql, function(err,row){
        if (err) throw err

        return res.status(200).json(row)
    })
})

 app.listen(5000, function(){
    console.log('TravelLand is listening on port 3000')

    dbConnection.connect( function (err){
        if (err) throw err
        
        console.log("Connected to MySQL")
    })

})