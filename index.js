require('dotenv').config()
const express =require('express');
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');
const app = express();

// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
console.log(app.get("view engine"))

// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./app/database/db')
connectMonggose();


// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next(); 
  });

// ***********************************Routes ********************************//
// app.use('/' , require('./routes'));
app.use('/', routes);


// ************************   Port Start   ********************************//
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`My server start on this port ${PORT}`)
})
