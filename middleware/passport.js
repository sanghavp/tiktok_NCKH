const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy ;
const { ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const Users = require('../Models/users')

passport.use( new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
   secretOrKey: process.env.JWT_ACCESS_KEY,
   }, async (payload, done) => {
      try {
         console.log("payload: ", payload)
         const user = await Users.findById(payload.id)
         
         if(!user) {
            return done(null, false)
         }
         done(null, user)
      } catch (error) {
         // console.log("test test");
         done(error, false)
      }
   }
   ))