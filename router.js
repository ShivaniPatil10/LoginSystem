var express = require('express');
var router = express.Router();

const credentials = {
    email : "shivani10@gmail.com",
    password : "Shivani@123"
}

//login user
router.post('/login',(req,res) => {
    if(req.body.email == credentials.email && req.body.password == credentials.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
      // res.end("Login successful !");

    }else{
        res.end("Invalid username and password!");
    }
})


//route for dashboard
router.get('/dashboard', (req,res)=> {
    if(req.session.user)
    {
        res.render('dashboard',{user: req.session.user});
    }
    else{
        res.send('Unauthorized User');
    }
})

//route for logout
router.get('/logout',(req,res)=> {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.render('base',{title : "Express" , logout : "Logout Successfully!."});
        }
    })
})
module.exports = router;