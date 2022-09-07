import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  avatar: {
    backgroundColor: "#C8E717",
  },
  paper: {
    padding: 30,
    width: 300,
    height: 300,
    margin: "90px auto",
  },
  registerPaper: {
    padding: 30,
    width: 300,
    margin: "90px auto",
  },
  icon: {
    color: "#0C4BC4",
    fontSize: "large",
  },
  contents: {
    padding: "30px",
    width: "auto",
  },
  id: {
    bottom: "1vh",
  },
  password: {
    top: "1vh",
  },
  button: {
    top: "4vh",
  },
  radio: {
    top: "2vh",
  },
}));

export default useStyles;
