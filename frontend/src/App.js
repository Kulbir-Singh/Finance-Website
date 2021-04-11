import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import News from "./components/News";
import GlobalStyles from "./components/GlobalStyles";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyles />
        <Router>
          <Wrapper>
            <Header />
            <Sidebar />
            <Page />
            <News />
            <Footer />
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
  grid-template-rows: 10% 85% 5%;
  grid-template-columns: 10% 75% 15%;
  grid-template-areas:
    "header header header"
    "sidebar page news"
    "footer footer footer";
`;

export default App;
