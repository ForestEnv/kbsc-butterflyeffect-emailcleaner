const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;
const axios = require("axios");

const emailServices = require("../../services/email");

exports.predictEmail = async (req, res, next) => {
  const { user_no, email_id } = req.body;
  const email_info = await emailServices.getEmailInfo({ user_no, email_id });
  console.log(email_info.dataValues);
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      Emails: {
        email_address: email_id,
        password: email_info.dataValues.email_Pw,
      },
    });
    res.status(CREATED).json({ result: response.data });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};
