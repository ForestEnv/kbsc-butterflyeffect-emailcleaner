const bcrypt = require("bcrypt");
const db = require("../services/db/admin");
const localAdmin = { usernameField: "id", passwordField: "password" };

const localadmin = async (id, password, done) => {
  try {
    console.log("debug test");
    console.log("*************3");
    const users = await db.selectID(id);
    console.log("*************4");
    if (!users) {
      return done(null, false);
    }
    const Result = await bcrypt.compare(password, users.password);
    if (!Result) {
      return done(null, false);
    }
    return done(null, users);
  } catch (error) {
    return done(null);
  }
};

module.exports = { localAdmin, localadmin };
