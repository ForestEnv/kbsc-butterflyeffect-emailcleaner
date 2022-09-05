const passport = require("passport");

exports.localAuth = passport.authenticate("local", { session: false });
exports.jwtAuth = passport.authenticate("jwt", { session: false });

exports.adlocalAuth = passport.authenticate("adlocal", { session: false });
exports.adjwtAuth = passport.authenticate("adjwt", { session: false });
