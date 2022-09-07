const db = require("./db/admin");

exports.setadmin = async (data) => {
  const users = await db.insertadmin(data);
  return users;
};