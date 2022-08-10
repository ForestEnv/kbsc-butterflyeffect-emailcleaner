const { ExtractJwt } = require('passport-jwt');
const db = require('../application/db/user');
const Learner = require('../models').Learner;

const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Bearer'),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
}

const jwtVerify = async(jwtPayload, done) => {
    try{
        const user = await db.selectUser(jwtPayload.id);
        if(user){
            done(null, user);
        }else{
            done(null, false, {reason: "FUCKING AUTH!"});
        }
    } catch(error){
        console.error(error);
        done(error);
    }
};

module.exports = { jwtConfig, jwtVerify };