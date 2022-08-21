const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;
const axios = require("axios");

const emailServices = require("../../services/email");

exports.deleteEmail = async (req, res, next) => {
  const { user_no, email_id, list } = req.body;
  const email_Pw = await emailServices.getEmailPassword({ user_no, email_id });
  await emailServices.setDeleteEmail({ Emails, deleteDate, emailLen });
  await emailServices.updateTotalNum(no, { emailLen });
  try {
    const response = await axios.post("http://127.0.0.1:5000/delete", {
      Emails: {
        email_address: email_id,
        password: email_Pw,
        list,
      },
    });
    res.status(CREATED).json({ result: response.emailLen });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};
