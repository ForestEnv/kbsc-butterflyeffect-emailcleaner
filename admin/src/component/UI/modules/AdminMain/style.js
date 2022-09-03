import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  paper: {
    padding: 30,
    width: 300,
    height: 300,
    margin: "90px auto",
  },
  avatar: {
    backgroundColor: "#C8E717",
  },
  icon: {
    color: "#0C4BC4",
    fontSize: "large",
  },
  lecturerButton: {
    width: "100px",
    height: "100px",
    margin: "10px",
    left: 10,
  },
  learnerButton: {
    width: "100px",
    height: "100px",
    margin: "10px",
    alignItems: "right",
    left: 20,
  },
}));

export default useStyles;
