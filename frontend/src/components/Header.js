import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { receiveUserInfo } from "../Actions";
import { useDispatch } from "react-redux";

const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const [nofication, setNotification] = useState(false);
  const handleCLick = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
      window.location.reload();
    } catch {
      setError("failed to logout");
    }
  };
  return (
    <Wrapper>
      <Logo>
        <Link to="/">Finance</Link>
      </Logo>
      <button onClick={handleCLick}>{currentUser ? "Logout" : "Login"}</button>
      <img src={receiveUserInfo} />
      <Notification onClick={() => setNotification(!nofication)}>
        🕭
      </Notification>
    </Wrapper>
  );
};

const Logo = styled.button``;

const Notification = styled.button`
  position: absolute;
  left: 97%;
  top: 3%;
  background-color: white;
  font-size: 25px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-area: header;
  background-color: #162252;
  z-index: 2;
`;

export default Header;
