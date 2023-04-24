const express = require ('express')
const router = express.Router()

const dbConnection = require ('../utils/mysql.connector')


//get users to the database
router.get('/api/users', function (req, res) {
    var sql = "SELECT * FROM users"
    return dbConnection.query(sql, function (err, result) {
        if (err) throw err;

        return res.json({
            status: true,
            statusCode: 200,
            data: result
        })
    })
})

//post users to the database
router.post('/api/users', function (req, res) {
    
    const {userid, username, email, phone_number, address, age, gender} = req.body
    var sql = `INSERT INTO users(userid, username, email, phone_number, address, age, gender) VALUES ('${userid}','${username}','${email}','${phone_number}','${address}','${age}','${gender}')`;
        
    return dbConnection.query(sql, function (err, result) { 
        if (err) throw err;
        
        return res.json({
            status: true,
            statusCode: 200,
            data: result
        })
     });
})

//Update users using patch
router.patch('/api/users/:userid', function (req, res) {
    
    //logic for
    const sql = `SELECT * FROM posts WHERE userid = '${req.params.userid}' LIMIT 1`

    return dbConnection.query(sql, function (err, rows) {
        if (err) throw err

        const user = request.body
        
        if (rows.length >= 1) {
            let props = ''

            props = Object.keys(user).map((key, index) => {
                               
                return props += `${[key]}='${Object.values(user).at(index)}',`
            })
            
            const updateSql = `UPDATE posts SET ${props[props.length - 1].slice(0, -1)} WHERE userid = '${rows[0].userid}'`
            
            return dbConnection.query(updateSql, function (err, rows) {
                if (err) throw err
                return res.json(rows[0])
            })
        } else {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: `User with userid '${request.params.userid}' does not exist.`
            })
        }
    })
})

//method to get a single user in the database 
router.get('/api/users/:userid', function(req,res){
    //Logic for get a single user from the database if the userid exists, return to the client app
    const sql = `SELECT * FROM users WHERE userid = '${req.params.userid}' LIMIT 1`

    dbConnection.query(sql, function(err,row){
        if (err) throw err

        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: row
        })
    })
})

 //delete single user from database 
 router.delete('api/users/:userid', function (req,res){

    //logic to user from the database
    const sql = `DELETE FROM users WHERE userid= '${req.params.userid}' LIMIT 1`

    dbConnection.query(sql, function(err,row){
        if (err) throw err

        return res.status(200).json({
            status: true,
            statusCode: 200,
            data: row
        })
    })
 })


module.exports = router