import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import GlobalStyles from "./components/GlobalStyles";
import { AuthProvider } from "./components/context/AuthContext";
import { receiveUserInfo } from "./Actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const ac = new AbortController();
    let userInfo = JSON.parse(localStorage.getItem("uid"));
    console.log(userInfo);
    if (userInfo) {
      dispatch(receiveUserInfo(userInfo.data));
    }
    return () => ac.abort();
  }, []);

  return (
    <>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <Wrapper>
            <Header />
            <Page />
            {/* <Footer /> */}
          </Wrapper>
        </Router>
      </AuthProvider>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  padding: none;
  margin: none;
  background-color: #f0fcfc;
  grid-template-rows: 10% 90% 0%;
  grid-template-columns: 10% 75% 15%;
  grid-template-areas:
    "header header header"
    "page page page"
    /* "footer footer footer"; */;
`;

export default App;
