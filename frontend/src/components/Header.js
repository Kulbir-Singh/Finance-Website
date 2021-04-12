import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Header = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
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
      <button onClick={handleCLick}>Log Out</button>
    </Wrapper>
  );
};
const Logo = styled.button``;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-area: header;
  background-color: #162252;
  z-index: 2;
`;

export default Header;
