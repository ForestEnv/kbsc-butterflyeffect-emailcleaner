import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  searchTitle: {
    flexGrow: "1",
    //display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appbar: {
    margin: 10,
    width: "auto",
  },
  search: {
    left: "2vh",
  },
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing.unit,
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  width: theme.spacing.unit * 9,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default useStyles;
