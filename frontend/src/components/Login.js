import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  receiveUserInfo,
  receiveUserInfoError,
  requestUserInfo,
} from "../Actions";

export default function Login() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let tempInfo;
  const [submitted, setSubmitted] = useState(false);
  //this is the onsubmit function that will handle the password and email verification
  //it will return an error if the password dont match of if the account hasnt been created
  useEffect(async () => {
    const ac = new AbortController();
    if (submitted) {
      try {
        setError("");
        setLoading(true);
        const info = await login(
          emailRef.current.value,
          passwordRef.current.value
        );
        let userInfo = {
          email: info.user.email,
          uid: info.user.uid,
          // username: info.user.displayName
          //   ? info.user.displayName
          //   : info.user.uid,
          photo: info.user.photoUrl
            ? info.user.photoUrl
            : "https://s3.amazonaws.com/appforest_uf/f1512936020165x278911292087286720/A.png",
        };
        console.log(userInfo);
        userInfo = await fetch("/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => data);
        console.log(userInfo);
        dispatch(receiveUserInfo(userInfo.data));
        localStorage.setItem("uid", JSON.stringify(userInfo));
        setLoading(false);
        history.push("/");
      } catch {
        setError("failed to sign in");
      }
    }

    return () => ac.abort();
  }, [submitted]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  if (!currentUser) {
    return (
      <>
        {error && <alert>{error}</alert>}
        <form onSubmit={handleSubmit}>
          <label for="Email">Email</label>
          <input
            id="Email"
            name="Email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <label for="Password">Password</label>
          <input
            id="Password"
            name="Password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          <button disabled={loading} type="submit">
            Log In
          </button>
          Create an account. <Link to="/signup">Sign Up</Link>
        </form>
      </>
    );
  } else {
    return <Redirect to="/content"></Redirect>;
  }
}
