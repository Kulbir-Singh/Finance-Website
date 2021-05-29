import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Switch, useHistory, useParams } from "react-router-dom";
import Signup from "./signup";
import Login from "./Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
import News from "./Pages/News";
import Profile from "./Pages/Profile";
import Navbar from "./Navbar";
import Homepage from "./Pages/Homepage";
import Stocks from "./Pages/Stocks";
import Stock from "./Pages/Stock";
import Bookmarked from "./Pages/Bookmarked";
import Search from "./Pages/Search";
import Posts from "./Pages/Posts";
import Notification from "./Pages/Notifcation";

const Page = () => {
  const user = useSelector((state) => state.userInfo);
  return (
    <Wrapper>
      {/* <Navbar /> */}
      {/* {user.USERINFO && <Notification />} */}
      <Switch>
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="/signup">
          <Signup />
        </Route>{" "}
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/stocks/:alpha">
          <Stocks />
        </Route>
        <Route exact path="/stocks/:stockId/:stockName">
          <Stock />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/search/:keyword">
          <Search />
        </Route>
        <Route exact path="/bookmarks">
          <Bookmarked />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
      </Switch>
    </Wrapper>
  );
};
const Bar = styled.p`
  position: fixed;
  top: 67px;
  left: 0;
  background-color: #f5f6fa;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: #f5f6fa;
  /* margin-left: 10%;
  margin-top: 20px;
  padding-top: 20px; */
  grid-area: page;
  height: 100%;
  /* border-right: 2px solid lightgrey;
  border-left: 2px solid lightgrey; */
  /* box-shadow: 0 0px 0px 0px white, 0 0px 0px 0px white,
    12px 0 15px -4px rgba(31, 73, 125, 0.8),
    -12px 0 15px -4px rgba(31, 73, 125, 0.8); */
`;

export default Page;
