import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
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
      <button onClick={handleCLick}>Log Out</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  grid-area: header;
  border: 2px solid blue;
`;

export default Header;
