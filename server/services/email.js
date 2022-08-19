const db = require('./db/email');

exports.setEmail = async (data) => {
    const result = await db.insertEmail(data);
    return result;
}