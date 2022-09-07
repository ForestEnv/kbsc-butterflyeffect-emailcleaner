const isLogin = () => !!localStorage.getItem("accessToken");
//const isLogin = () => !true;

export default isLogin;
