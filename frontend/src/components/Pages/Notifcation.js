import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import GotNotification from "../../Resources/notification.png";
import NoNotification from "../../Resources/notification1.png";

export default function Notification({
  notification,
  setNotification,
  unreadNotifications,
  setUnreadNotifications,
}) {
  const user = useSelector((state) => state.userInfo);

  const [incomingNotifications, setIncomingNotifications] = useState();
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
    <Wrapper notification={notification}>
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
  text-decoration: none;
  background-color: white;
  border: none;
`;
const Notifications = styled.div`
  height: 100%;
  padding-top: 50px;
  top: 0%;
  background-color: white;
  border: 2px solid #e9eaf0;
  transform: ${(props) =>
    props.notification ? "translateX(0%)" : "translateY(-150%)"};
  transition-duration: 1s;
  box-shadow: ${(props) =>
    props.notification
      ? ""
      : "0 0px 0px 0px white, 0 0px 0px 0px white,12px 0 15px -4px rgba(31, 73, 125, 0.8),-12px 0 15px -4px rgba(31, 73, 125, 0.8)"};
`;

const Wrapper = styled.div`
  width: 300px;
  height: ${(props)=>props.notification?"93%":"0%"};
  transition-duration: 1s;
  opacity:${(props)=>props.notification? "1":"0"};
  position: fixed;
   top:${(props)=>props.notification?"6.75vh":"0"} ;
  right: 0;
  :focus {
    transform: scale(1);
  }
  z-index: 10;
`;
