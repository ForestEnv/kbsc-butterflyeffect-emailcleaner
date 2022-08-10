const db = require('./db/user');

exports.setUser = async (data) => {
    const users = await db.insertUser(data);
    return users;
  };