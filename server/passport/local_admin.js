const bcrypt = require("bcrypt");
const db = require("../services/db/admin");
const localAdmin = { usernameField: "id", passwordField: "password" };

const localadmin = async (id, password, done) => {
  try {
    const users = await db.selectID(id);
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
