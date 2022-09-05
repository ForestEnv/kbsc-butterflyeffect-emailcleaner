const { ExtractJwt } = require('passport-jwt');
const db = require('../services/db/admin');

const jwtAdmin = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
  };

  const jwtID = async (jwtPayload, done) => {
  
    try {
      const users = await db.selectPassport(jwtPayload.id);
      if (users) {
        done(null, users);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  };

  module.exports = { jwtAdmin, jwtID};