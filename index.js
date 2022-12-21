const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine' , 'ejs');

//load the static assets

app.use('/static',express.static(path.join(__dirname,'public')));
//load image
app.use('/assets',express.static(path.join(__dirname,'public/assets')));
app.use(session({
    secret: uuidv4(), //'secret'
    resave: false,
    saveUninitialized : true
}))

app.use('/route',router);
//route to home page

app.get('/',(req,res) => {
    res.render('base',{titl : "Login System"});
})

app.listen(port,()=> {
    console.log("Listening to the server on http://localhost:3000");
})