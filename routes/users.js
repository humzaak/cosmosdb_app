const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();


//User Model
const User  = require('../models/User')

//Login
router.get('/login', (req,res) => res.render('login'));

//Register Page Get
router.get('/register', (req,res) => res.render('register'));

//Register Handle Post
router.post('/register', (req, res)=> {
    const { name, email, password, password2} = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    if(password != password2)
    errors.push({msg: 'Passwords do not match'});

    if(password.length < 6)
    errors.push({msg: 'Password cannot be less than 6 characters'});

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        //res.send('pass')
        // Validation passed
        User.findOne({email:email} ).then(user=>{
            if(user){
                // user exists
                errors.push({msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name, 
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err,salt)=>bcrypt.hash(newUser.password,salt, (err,hash)=>{
                    if(err) throw err;
                    
                    //Set password to hash generated
                    newUser.password = hash;
                    //save user
                    newUser.save().then(user => {
                        req.flash('success_msg','You are now registered and can login');
                        res.redirect('/users/login');
                    }).catch(err => console.log(err))

                }))

            }
        })
    }


});

//Login handle
router.post('/login', (req,res,next)=> {
 passport.authenticate('local',{

    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
 }) (req,res, next);
});

//Logout handle
router.get('/logout', (req,res)=> {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;