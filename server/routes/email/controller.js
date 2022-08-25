const { OK, CREATED, BAD_REQUEST } = require('../../config/statusCode').statusCode;

const userServices = require('../../services/user');
const emailServices = require("../../services/email");

const axios = require("axios");

exports.connectionEmail = async (req, res, next) => {
    try {
        console.log(req.body);
        const { no, id, email_id, email_Pw } = req.body;
        await userServices.updateIsConnectionEmail(no);
        await emailServices.setEmail({ no, email_id, email_Pw });
        // const isConnectionEmail = await userServices.getIsConnectionEmail(no);
        const response = await axios.post("http://localhost:5000/link", {
        UserName: id,
        Emails: {
            email_address: email_id,
            password: email_Pw,
            },
        });
        const connectionMsg = response.data.success_message;
        console.log("DATA FROM FLASK=" + connectionMsg);
        res.status(CREATED).json({
            message: "이메일 연동 작업!",
            //totalEmailNum,
            connectionMsg,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: "이메일 연동 실패!",
        });
    }
};

exports.connectionAddEmail = async (req, res, next) => {
    try {
        console.log(req.body);
        const { no, id, email_id, email_Pw } = req.body;
        await emailServices.setEmail({ no, email_id, email_Pw });
        // const isConnectionEmail = await userServices.getIsConnectionEmail(no);
        const response = await axios.post("http://localhost:5000/link", {
            UserName: id,
            Emails: {
                email_address: email_id,
                password: email_Pw,
            },
        });
        const connectionMsg = response.data.success_message;
        console.log("DATA FROM FLASK=" + connectionMsg);
        res.status(CREATED).json({
            message: "이메일 연동 작업!",
            //totalEmailNum,
            connectionMsg,
        });
    } catch (error) {
            res.status(BAD_REQUEST).json({
            message: "이메일 연동 실패!",
        });
    }
};

exports.countEmail = async (req, res, next) => {
    try {
        const { user_no } = req.body;
        console.log(user_no);
        const emailData = await emailServices.getEmail({ user_no });
        console.log(emailData);
        const response = await axios.post("http://localhost:5000/count", {
            Emails: emailData,
        });
        console.log(response.data);
        //const totalEmailNum = response.data.Result[0].emailCount;
        //console.log("DATA FROM FLASK=" + totalEmailNum);
        res.status(CREATED).json({
            message: "이메일 연동 성공!",
            Ressult: response.data.Result,
            //isConnectionEmail,
        });
    } catch (error) {
        res.status(BAD_REQUEST).json({
        message: "이메일 연동 실패!",
        });
    }
};

exports.predictEmail = async (req, res, next) => {
    const { user_no, email_id } = req.body;
    const email_info = await emailServices.getEmailInfo({ user_no, email_id });
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

exports.deleteEmail = async (req, res, next) => {
    const { user_no, email_id, list } = req.body;
    const email_info = await emailServices.getEmailInfo({
        user_no,
        email_id,
    });
    //await emailServices.setDeleteEmail({ Emails, deleteDate, emailLen });
    try {
        const response = await axios.post("http://127.0.0.1:5000/delete", {
            Emails: {
            email_address: email_id,
            password: email_info.dataValues.email_Pw,
            list,
            },
        });
    await userServices.updateExperience({
        user_no,
        emailLen: response.data.emailLen,
    });
    await emailServices.updateTotalNum({
        email_no: email_info.dataValues.no,
        emailLen: response.data.emailLen,
    });

    res.status(CREATED).json({ result: response.data.emailLen });
    } catch (error) {
        res.status(BAD_REQUEST).json({
            message: "연동 실패!",
        });
    }
};