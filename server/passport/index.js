const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy } = require('passport-jwt');

const { localConfig, localVerify } = require('./local_strategy');
const { jwtConfig, jwtVerify } = require('./jwt_strategy');
const { localAdmin, localadmin } = require('./local_admin');
const { jwtAdmin, jwtID } = require('./jwt_admin');

module.exports = () => {
    passport.use('local', new LocalStrategy(localConfig, localVerify));
    passport.use('jwt', new JWTStrategy( jwtConfig, jwtVerify));
    passport.use('adlocal', new LocalStrategy(localAdmin, localadmin));
    passport.use('adjwt', new JWTStrategy(jwtAdmin, jwtID));
};