const bcrypt = require('bcrypt');
const db = require('../services/db/admin');
const localAdmin = { adminid: 'id', adminpassword: 'password' };

const localadmin = async (id, password, done) => {
    try {
      console.log('debug test')
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