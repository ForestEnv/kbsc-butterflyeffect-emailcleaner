// npm install react-router-dom @mui/material @emotion/react @emotion/styled sweetalert2 react-jss @mui/icons-material
/*import module*/
import React from "react";
/*import router*/
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*import routes*/
import Routes from "./routes";

import Landing from "./component/page/Landing";
import LoginPage from "./component/page/Login";
import RegisterPage from "./component/page/Register";
import UpdatePage from "./component/UI/atom/update_button";

// route (publicroute) 설정 필요
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={<Landing />} />
        <Route path="/login" component={<LoginPage />} />
        <Route path="/register" component={<RegisterPage />} />
        <Route path="/admin" component={<UpdatePage />} />
      </Switch>
    </Router>
    /**
     * <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
    */
  );
}

export default App;
