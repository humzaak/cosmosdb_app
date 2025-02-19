const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();



//Passport config 
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(()=> console.log('MongoDB connected....'))
.catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express session middleware
app.use(session({
    secret: 'artcsecret',
    resave: true,
    saveUninitialized: true
  }));

  //Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

//Connect Flash
app.use(flash());

//Global vars
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//Static
app.use(express.static(path.join(__dirname, 'public'))); 


//Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on port ${PORT}`))