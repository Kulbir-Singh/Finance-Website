import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { receiveUserInfo } from "../Actions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const [nofication, setNotification] = useState(false);
  const [value, setValue] = useState("");
  const handleKeyDown = () => {};
  const handleCLick = async () => {
    setError("");
    try {
      await logout();
      localStorage.removeItem("uid");
      history.push("/login");
      window.location.reload();
    } catch {
      setError("failed to logout");
    }
  };
  console.log(user);
  return (
    <Wrapper>
      <Logo>
        <Link to="/">Homepage</Link>
      </Logo>
      <img src={receiveUserInfo} />
      <div>
        <Input
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button>
          <Link to={`search/${value}`}>Search</Link>
        </Button>
      </div>{" "}
      {user && (
        <UserInfo>
          {" "}
          {user.USERINFO && <UserImg src={user.USERINFO.photo} />}
          {user.USERINFO && (
            <UserName>Welcome, {user.USERINFO.username}</UserName>
          )}
          <button onClick={handleCLick}>
            {currentUser ? "Logout" : "Login"}
          </button>
        </UserInfo>
      )}{" "}
      {user.USERINFO && (
        <Notification onClick={() => setNotification(!nofication)}>
          🕭
        </Notification>
      )}
    </Wrapper>
  );
};

const Button = styled.button``;

const Input = styled.input`
  width: 250px;
`;

const Logo = styled.button``;

const Notification = styled.button`
  position: absolute;
  left: 97%;
  top: 3%;
  background-color: white;
  font-size: 25px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
`;
const UserInfo = styled.div`
  display: flex;
`;
const UserName = styled.div`
  color: white;
  font-size: 25px;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  grid-area: header;
  background-color: #162252;
  z-index: 2;
`;

export default Header;
