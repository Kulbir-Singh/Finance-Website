import React from "react";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.userInfo);
  console.log(user.USERINFO);
  if (user) {
    return <div>Profile</div>;
  }
}
