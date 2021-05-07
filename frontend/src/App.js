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
            <Sidebar />
            <Page />
          </Wrapper>
        </Router>
      </AuthProvider>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  padding: none;
  margin: none;
  background-color: white;
  grid-template-rows: 7vh 93vh;
  grid-template-columns: 15% 85%;
  grid-template-areas:
    "sidebar header header"
    "sidebar page page";
`;

export default App;
