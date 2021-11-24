import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';
import userModel from "../models/user.model";

export const strategy = new Strategy((username, password, done) => {
    userModel.findOne({username: username}, (err:any, user:any) => {
        if(err) throw err;
        if(!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result:boolean) => {
            if(err) throw err;
            if(result) done(null, user) ;
            else done(null, false, {message: 'Password incorrect'});
        }); 
        
    });
});