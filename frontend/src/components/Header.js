import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { receiveUserInfo } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import subVault from "../Resources/vaultLogo.png";

const Header = () => {
  const user = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
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
      <Logo onClick={() => history.push("/")}>Vault </Logo>
      {/* <SubLogo src={subVault} /> */}
      <HeaderOptions>
        <Link to="/news">News</Link>
        <Link to="/stocks">Stocks</Link>
        <img src={receiveUserInfo} />
      </HeaderOptions>
      <SearchBar>
        <Input
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={() => history.push(`/search/${value}`)}>
          Search
          {/* <Link to={`/search/${value}`}></Link> */}
        </Button>
      </SearchBar>{" "}
      {user && (
        <UserInfo>
          {" "}
          {user.USERINFO && <UserImg src={user.USERINFO.photo} />}
          {user.USERINFO && (
            <UserName>Welcome, {user.USERINFO.username}</UserName>
          )}
          <LoginBtn onClick={handleCLick}>
            {currentUser ? "Logout" : "Login"}
          </LoginBtn>
        </UserInfo>
      )}{" "}
    </Wrapper>
  );
};

const HeaderOptions = styled.div`
  display: flex;
  width: 65%;
  > * {
    padding-right: 100px;
  }
`;

const LoginBtn = styled.button`
  height: 30px;
  border-radius: 20px;
  outline: none;
  background-color: #010718;
  color: white;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  border: 3px solid white;
  transition-duration: 0.75s;
  :hover {
    color: black;
    border: 3px solid black;
    background-color: white;
  }
`;
const SubLogo = styled.img`
  width: 60px;
  height: 50px;
`;

const Button = styled.button`
  background-color: #010718;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid white;
  cursor: pointer;
  outline: none;
  margin-left: -3px;
  font-size: 15px;
  color: white;
  border-radius: 20px;
  transition-duration: 0.75s;
  :hover {
    color: black;
    border: 3px solid black;
    background-color: white;
  }
`;

const SearchBar = styled.div`
  /* position: absolute; */
  display: flex;
  right: 425px;
  margin-right: 20px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid white;
`;

const Input = styled.input`
  width: 250px;
  height: 30px;
  outline: none;
  text-decoration: none;
  border: none;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
`;

const Logo = styled.button`
  left: 25px;
  font-size: 30px;
  position: absolute;
  margin-right: 40px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  border: none;
  font-family: "Alfa Slab One";
  text-decoration: none;
  background-color: transparent;
  transition-duration: 0.5s;

  :hover {
    border: 5px solid white;
    border-radius: 5px;
  }
`;

const UserImg = styled.img`
  width: 50px;
  background-color: white;
  border: 3px solid white;
  border-radius: 25px;
  margin: 10px;
  height: 50px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  /* position: absolute; */
  right: 125px;
`;
const UserName = styled.div`
  color: white;
  font-size: 15px;
  padding-right: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  height: 65px;
  padding-left: 200px;
  grid-area: header;
  background: linear-gradient(
    0deg,
    rgba(1, 19, 69, 1) 0%,
    rgba(14, 18, 32, 1) 100%
  );
  z-index: 2;
`;

export default Header;
