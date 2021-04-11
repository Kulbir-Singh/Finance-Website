import React from "react";
import styled from "styled-components";
import { NavLink, Switch, useHistory } from "react-router-dom";
import Signup from "./signup";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import News from "./Pages/News";
import Profile from "./Pages/Profile";
import Navbar from "./Navbar";

const Page = () => {
  return (
    <Wrapper>
      <Router>
        {" "}
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/news">
            <News />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-area: page;
  border: 2px solid orange;
`;

export default Page;
