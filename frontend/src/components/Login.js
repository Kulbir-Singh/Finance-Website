import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  receiveUserInfo,
  receiveUserInfoError,
  requestUserInfo,
} from "../Actions";
import styled, { keyframes } from "styled-components";
import Connection from "../Resources/connect.jpg";

export default function Login() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
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
        setLoading(false);
        setSubmitted(false);
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
      <Wrapper>
        <ImgContainer>
          <Img src={Connection} />
        </ImgContainer>
        <Form onSubmit={handleSubmit}>
          {error && <alert>{error}</alert>}
          <LoginOptions>
            <SignUpLink
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign Up
            </SignUpLink>{" "}
            <SignupOptions>Log In</SignupOptions>
          </LoginOptions>
          <H1>LOG IN</H1>
          <UserNameInput
            id="Email"
            name="Email"
            type="email"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <PasswordInput
            id="Password"
            name="Password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          <LoginButton disabled={loading} type="submit">
            Log In
          </LoginButton>
        </Form>
      </Wrapper>
    );
  } else {
    return <Redirect to="/content"></Redirect>;
  }
}

const LoginButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 5px;
  border: 2px solid grey;
  font-size: 25px;
  color: white;
  background-color: #041c61;
`;
const LoginOptions = styled.div`
  display: flex;
`;
const SignupOptions = styled.div`
  width: 100%;
  height: 50px;
  align-items: center;
  display: flex;
  color: white;
  justify-content: center;
  background-color: #041c61;
`;
const H1 = styled.div`
  color: white;
  text-align: center;
  font-size: 30px;
  padding: 30px 0;
`;

const SignUpLink = styled.button`
  font-size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  color: white;
  background-color: darkgrey;
`;
const ImgContainer = styled.div`
  padding-right: 150px;
  margin-top: 100px;
  border-right: 2px solid grey;
`;
const Img = styled.img`
  width: 600px;
  height: 600px;
`;
const Form = styled.form`
  display: flex;
  height: 500px;
  width: 30%;
  margin-left: 100px;
  margin-top: 100px;
  margin-right: 50px;
  padding: 30px;
  border-radius: 4px;
  background-color: #010718;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69vh;
`;

const morph = keyframes`
  0%{transform:translateY(-150%);opacity:0;};
  50%{transform:translateY(-100%);opacity:0.5;};
  100%{transform:translateY(0%);opacity:1;};
`;

const UserNameInput = styled.input`
  height: 40px;
  width: 100%;
  color: white;
  margin: 0 0 35px 0;
  border: 2px solid grey;
  border-radius: 3px;
  animation: ${morph} 0.75s linear;
  background-color: #010718;
  ::placeholder {
    color: white;
  }
`;

const PasswordInput = styled.input`
  height: 40px;
  width: 100%;
  color: white;
  animation: ${morph} 0.75s linear;
  margin: 0 0 35px 0;
  border: 2px solid grey;
  border-radius: 3px;
  background-color: #010718;
  ::placeholder {
    color: white;
  }
`;
