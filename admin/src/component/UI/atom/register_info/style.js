import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  registerPaper: {
    padding: 30,
    width: 350,
    margin: "90px auto",
  },
  signinButton: {
    top: "3vh",
  },
}));

export default useStyles;
