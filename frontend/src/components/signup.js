import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  requestUserInfo,
  receiveUserInfo,
  receiveUserInfoError,
} from "../Actions";
import { getUserInformation } from "../Reducers/userInfoReducer";

export default function Signup() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userInfoData = useSelector(getUserInformation);
  //this is the onsubmit function that will handle the password and email verification
  //it will return an error if the password dont match of if the account hasnt been created
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords don't match");
    }
    dispatch(requestUserInfo());
    try {
      setError("");
      setLoading(true);
      const info = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      let userInfo = {
        email: info.user.email,
        uid: info.user.uid,
        username: info.user.displayName ? info.user.displayName : info.user.uid,
        photo: info.user.photoUrl
          ? info.user.photoUrl
          : "https://s3.amazonaws.com/appforest_uf/f1512936020165x278911292087286720/A.png",
        following: [],
        followers: [],
        categories: [],
      };
      fetch("/getallusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(receiveUserInfo(data));
          setLoading(false);
          history.push("/");
        });
      dispatch(receiveUserInfo(userInfo));
      localStorage.setItem("uid", JSON.stringify(userInfo));
    } catch (err) {
      setError("account not created");
      dispatch(receiveUserInfoError());
    }
  };

  return (
    <>
      {error && <alert>{error}</alert>}
      <form onSubmit={handleSubmit}>
        <label for="Email">Email</label>
        <input
          id="Email"
          name="Email"
          type="email"
          placeholder="email"
          ref={emailRef}
          placeholder="Email"
          required
        />
        <label for="Password">Password</label>
        <input
          id="Password"
          name="Password"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <label for="password-confirm">Password Confirmation</label>
        <input
          id="password-confirm"
          name="password-confirm"
          type="password"
          placeholder="Password"
          ref={passwordConfirmationRef}
          required
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
        Already have an account? <Link to="/login">Log In</Link>
      </form>
    </>
  );
}
