import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { receiveUserInfo } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import subVault from "../Resources/vaultLogo.png";
import Searchicon from "../Resources/searchicon.png";
import Noti from "../Resources/bellicon.png";
import Notification from "./Pages/Notifcation";
import UnreadNoti from "../Resources/bellicon1.png";
import LoginIcon from "../Resources/powerswitch.png";

const Header = () => {
  const user = useSelector((state) => state.userInfo);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);
  const { currentUser, logout } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState();
  const [notification, setNotification] = useState(false);
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      history.push(`/search/${value}`);
    }
  };

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

  return (
    <Wrapper>
      <SearchBar>
        <Button onClick={() => history.push(`/search/${value}`)}>
          <SearchImg src={Searchicon} />
        </Button>
        <Input
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchBar>
      {user && (
        <UserInfo>
          <NotificationIcon onClick={() => setNotification(!notification)}>
            {unreadNotifications?.length <= 0 && <Img src={Noti} />}
            {unreadNotifications?.length > 0 && <Img src={UnreadNoti} />}
            {/* {<NotiImg src={Noti} />} */}
            {user.USERINFO && (
              <Notification
                notification={notification}
                setNotification={setNotification}
                unreadNotifications={unreadNotifications}
                setUnreadNotifications={setUnreadNotifications}
              />
            )}
          </NotificationIcon>
          <LoginBtn user={user} onClick={handleCLick}>
            {<LoginImg src={LoginIcon} />}
          </LoginBtn>
        </UserInfo>
      )}
    </Wrapper>
  );
};
const Img = styled.img`
  width: 25px;
  height: 25px;
`;
const HeaderOptions = styled.div`
  display: flex;
  width: 65%;
  > * {
    padding-right: 100px;
  }
`;

const LoginImg = styled.img`
  width: 25px;
`;

const NotiImg = styled.img`
  width: 25px;
  height: 25px;
`;

const SearchImg = styled.img`
  width: 23px;
  height: 23px;
`;

const NotificationIcon = styled.button`
  font-size: 16px;
  width: 40px;
  height: 100%;
  background-color: white;
  border: none;
  margin: 0 30px;
  outline: none;
`;

const LoginBtn = styled.button`
  outline: none;
  height: 100%;
  font-size: 16px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const SubLogo = styled.img`
  width: 60px;
  height: 50px;
`;

const Button = styled.button`
  text-decoration: none;
  background-color: white;
  cursor: pointer;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: -3px;
  font-size: 15px;
  color: white;
  transition-duration: 0.75s;
  :hover {
    color: black;
    transform: scale(1.1);
    background-color: transparent;
  }
`;

const SearchBar = styled.div`
  /* position: absolute; */
  display: flex;
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 25px;
  color: #929396;
  text-decoration: none;
  border: none;
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
    border-radius: 5px;
  }
`;

const UserImg = styled.img`
  width: 50px;
  background-color: white;
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
  /* position: fixed; */
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  border-bottom: 3px solid #e9eaf0;
  grid-area: header;
`;

export default Header;
