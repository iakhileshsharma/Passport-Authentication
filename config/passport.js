const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
               //Match User 
               User.findOne({ email: email})
               .then(user => {
                if(!user){
                    return done(null, false, { message: 'That email is not register'});
                }

                 // Match password
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, { message: 'password incorrect'}); 
                    }
                 });
               })
               .catch(err => console.log(err));
        })
    );

     passport.serializeUser((user, done) => {
        done(null, user.id);
     });

     passport.deserializeUser( async (id, done) => {
        const data =  await User.find({_id : `ObjectId(${id})`});
        console.log(data.body);
        done(null, data.body)
     });

}