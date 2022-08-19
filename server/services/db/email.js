const { Email } = require('../../models');
const { hashingPw } = require('../../utils/bcrypt');

exports.insertEmail = async({no, email, emailPassword}) => {
    const emailData = {
        user_no: no,
        email,
        email_password: await hashingPw(emailPassword),
    }
    const result = await Email.create(emailData);
    return result;
}