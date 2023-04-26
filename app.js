const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
// const db = require('./db')
const routes = require('./server/routers/user')

require('dotenv').config();
const app = express()
const PORT = process.env.PORT 


// middlewares
app.use(bodyParser.urlencoded({extended: false}))

//parse application
app.use(bodyParser.json())
app.use(express.static('public'))

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './views')


//connection pool

const pool = mysql.createPool({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

pool.getConnection((err, connection) =>{
    if(err) throw err;
    console.log('connected as ID ' + connection.threadId);
});

//router
app.use('/', routes)

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))