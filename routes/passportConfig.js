
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;


function initialize(passport,getUserById,getUserByEmail){
    const authUsers = async (email,password,done)=>{
        try{
        const users =  getUserByEmail(email);
        if(users===null){
            return done(null, false,{message:"Bad request"});
        }

            if(await bcrypt.compare(password, users.password)){

                return done(null, users);
            }else{
                return done(null, false, {message:"Wrong Password"});
            }
        }catch (e){
            console.log(e);
            return done(e);
        }
    }
passport.use(new LocalStrategy({usernameField: 'email'},authUsers));
    passport.serializeUser((user,done)=>{
    done(null, user.id);
    })
    passport.deserializeUser((id,done)=>{
    return done(null, getUserById(id));
    })

}

module.exports = initialize;