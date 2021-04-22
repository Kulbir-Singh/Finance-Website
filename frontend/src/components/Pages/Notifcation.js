import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GotNotification from "../../Resources/notification.png";
import NoNotification from "../../Resources/notification1.png";

export default function Notification() {
  const user = useSelector((state) => state.userInfo);
  const [notification, setNotification] = useState(false);
  const [incomingNotifications, setIncomingNotifications] = useState();
  const [unreadNotifications, setUnreadNotifications] = useState();
  const [readNoti, setReadNoti] = useState(false);

  const setRead = (content) => {
    if (user.USERINFO) {
      let userInfo = { to: user.USERINFO.uid, content: content };
      console.log(content);
      fetch("/isread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => setReadNoti(data));
    }
  };

  useEffect(() => {
    if (user.USERINFO) {
      let uid = user.USERINFO.uid;
      fetch("/sharedarticles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: uid }),
      })
        .then((res) => res.json())
        .then((data) => setIncomingNotifications(data.data.shared));
    }
  }, [readNoti]);

  useEffect(() => {
    if (incomingNotifications) {
      let unread = incomingNotifications.filter((item) => {
        return item.isRead === false;
      });
      setUnreadNotifications(unread);
    }
  }, [incomingNotifications, readNoti]);

  return (
    <Wrapper>
      {user && (
        <Icon onClick={() => setNotification(!notification)}>
          {unreadNotifications?.length <= 0 && <Img src={NoNotification} />}
          {unreadNotifications?.length > 0 && <Img src={GotNotification} />}
        </Icon>
      )}
      <Notifications notification={notification}>
        {unreadNotifications &&
          unreadNotifications.map((item) => {
            return (
              <IndividualNoti
                onClick={() => {
                  setRead(item.content);
                }}
              >
                {item.url}
              </IndividualNoti>
            );
          })}
      </Notifications>
    </Wrapper>
  );
}

const IndividualNoti = styled.button`
  margin: 0 0 20px 0;
`;
const Notifications = styled.div`
  height: 100%;
  padding-top: 50px;
  top: 10%;
  background-color: #041c61;
  transform: ${(props) =>
    props.notification ? "translateY(0%)" : "translateY(-150%)"};
  z-index: ${(props) => (props.notification ? "-1" : "100")};
  transition-duration: 1s;
  box-shadow: ${(props) =>
    props.notification
      ? ""
      : "0 0px 0px 0px white, 0 0px 0px 0px white,12px 0 15px -4px rgba(31, 73, 125, 0.8),-12px 0 15px -4px rgba(31, 73, 125, 0.8)"};
`;

const Icon = styled.button`
  position: absolute;
  right: 5px;
  height: 45px;
  width: 45px;
  z-index: 10;
  background-color: #041c61;
  border-radius: 20px;
  border: none;
  outline: none;
`;
const Wrapper = styled.div`
  width: 300px;
  height: 93%;
  position: fixed;
  top: 85px;
  right: 0;
`;

const Img = styled.img`
  z-index: 100;
  width: 40px;
  height: 40px;
`;
