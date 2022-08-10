const { CREATED, BAD_REQUEST } = require('../../config/statusCode').statusCode;
const userServices = require('../../services/user');
const { createJwtAccessToken } = require('../../utils/jwt');

//사용자 --> 회원가입 API
exports.register = async (req, res, next) => {
    try{
        const { name, id, password } = req.body;
        await userApp.registerUser({name, id, password});
        res.status(CREATED).json({
            registerSuccess: true,
            message: '회원가입 성공!'
        });
    } catch (error){
        res.status(BAD_REQUEST).json({
            message: "회원가입 실패!"
        });
    }
};

//사용자 --> 로그인 API
exports.login = async (req, res, next) => {
    try{
        const user = req.body;
        const accessToken = createJwtAccessToken(user.id);
        res.status(CREATED).json({
            message: '로그인 성공!',
            accessToken,
        });
    } catch(error){
        res.status(BAD_REQUEST).json({
            message: "로그인 실패!"
        });
    }
};