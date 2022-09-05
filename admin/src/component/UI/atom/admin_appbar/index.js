import React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import useStyles from "./style";

const SearchBar = ({ userName, value, handleSeachKey }) => {
  const classes = useStyles();
  //media query
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar position="static" className={classes.appbar} elevation={10}>
      <Toolbar>
        <Typography
          className={classes.searchTitle}
          variant="h6"
          color="inherit"
          noWrap
        >
          {userName}님의 고객 관리 시스템
        </Typography>

        {isMobile ? null : (
          <Search className={classes.search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="회원 검색"
              inputProps={{ "aria-label": "search" }}
              value={value}
              onChange={handleSeachKey}
            />
          </Search>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default SearchBar;
