import React, { useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Connection from "../Resources/connect.jpg";
import {
  requestUserInfo,
  receiveUserInfo,
  receiveUserInfoError,
} from "../Actions";
import { getUserInformation } from "../Reducers/userInfoReducer";
import styled, { keyframes } from "styled-components";

export default function Signup() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();

  const passwordRef = useRef();
  const UserNameRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const [uniqueUser, setUniqueUser] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const userInfoData = useSelector(getUserInformation);
  //this is the onsubmit function that will handle the password and email verification
  //it will return an error if the password dont match of if the account hasnt been created
  useEffect(() => {
    fetch("/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);

  const checkUserName = (userName) => {
    if (users) {
      let user = users.filter((user) => {
        return user.username === userName;
      });
      setUniqueUser(user);
      if (user.length > 0) {
        setError("username taken");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords don't match");
    }
    dispatch(requestUserInfo());
    try {
      setError("");
      setLoading(true);
      if (!(error.length > 2)) {
        const info = await signup(
          emailRef.current.value,
          passwordRef.current.value
        );
        let userInfo = {
          email: info.user.email,
          uid: info.user.uid,
          username: info.user.displayName
            ? info.user.displayName
            : UserNameRef.current.value,
          photo: info.user.photoUrl
            ? info.user.photoUrl
            : "https://s3.amazonaws.com/appforest_uf/f1512936020165x278911292087286720/A.png",
          following: [],
          followers: [],
          stocks: [],
          categories: [],
        };
        fetch("/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(receiveUserInfo(data.data));
          });
        localStorage.setItem("uid", JSON.stringify(userInfo));
        setLoading(false);
        history.push("/");
      }
    } catch (err) {
      setError("");
      dispatch(receiveUserInfoError());
      setLoading(true);
    }
  };

  return (
    <Wrapper>
      <ImgContainer>
        <Img src={Connection} />
      </ImgContainer>

      <Form onSubmit={handleSubmit}>
        {error && <alert>{error}</alert>}
        <LoginOptions>
          <SignupOptions>Sign Up</SignupOptions>
          <LoginLink
            onClick={() => {
              history.push("/login");
            }}
          >
            Log In
          </LoginLink>
        </LoginOptions>
        <H1>SIGN UP</H1>
        <UserBio>
          <UserName>
            <label for="UserName"></label>
            <UserNameInput
              id="UserName"
              name="UserName"
              type="text"
              ref={UserNameRef}
              onBlur={(ev) => checkUserName(ev.target.value)}
              placeholder="UserName"
              required
            />
          </UserName>
          <Email>
            <label for="Email"></label>
            <EmailInput
              id="Email"
              name="Email"
              type="email"
              placeholder="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
          </Email>
        </UserBio>
        <Password>
          <label for="Password"></label>
          <PasswordInput
            id="Password"
            name="Password"
            type="password"
            ref={passwordRef}
            placeholder="Password"
            required
          />
        </Password>
        <Password2>
          <label for="password-confirm"></label>
          <Password2Input
            id="password-confirm"
            name="password-confirm"
            type="password"
            placeholder="Password Confirmation"
            ref={passwordConfirmationRef}
            required
          />
        </Password2>
        <SignUpButton disabled={loading} type="submit">
          Sign Up
        </SignUpButton>
      </Form>
    </Wrapper>
  );
}
const ImgContainer = styled.div`
  padding-right: 150px;
  margin-top: 100px;
  border-right: 2px solid grey;
`;
const Img = styled.img`
  width: 600px;
  height: 600px;
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

const LoginLink = styled.button`
  font-size: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  color: white;
  background-color: darkgrey;
`;
const morph = keyframes`
  0%{transform:translateY(-150%);opacity:0;};
  50%{transform:translateY(-100%);opacity:0.5;};
  100%{transform:translateY(0%);opacity:1;};
`;
const Form = styled.form`
  padding: 30px;
  margin-left: 100px;
  margin-top: 100px;
  margin-right: 50px;
  border-radius: 4px;
  height: 500px;
  width: 30%;
  background-color: #010718;
`;
const SignUpButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 5px;
  border: 2px solid grey;
  font-size: 25px;
  color: white;
  background-color: #041c61;
`;
const H1 = styled.div`
  color: white;
  text-align: center;
  font-size: 30px;
  padding: 30px 0;
`;

const UserBio = styled.div`
  display: flex;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 69vh;
`;
const Password2 = styled.div`
  margin: 0 0 35px 0;
`;
const Password = styled.div`
  margin: 0 0 35px 0;
`;
const Email = styled.div`
  width: 100%;
  margin: 0 0 35px 5px;
`;
const UserName = styled.div`
  margin: 0 5px 35px 0;
  width: 100%;
`;
const Password2Input = styled.input`
  height: 40px;
  width: 100%;
  color: white;
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
  background-color: #010718;
  color: white;
  border: 2px solid grey;
  border-radius: 3px;
  animation: ${morph} 0.75s linear;
  background-color: #010718;
  ::placeholder {
    color: white;
  }
  width: 100%;
`;
const EmailInput = styled.input`
  height: 40px;
  width: 100%;
  color: white;
  border: 2px solid grey;
  border-radius: 3px;
  background-color: #010718;
  animation: ${morph} 0.75s linear;
  ::placeholder {
    color: white;
  }
`;
const UserNameInput = styled.input`
  height: 40px;
  color: white;
  width: 100%;
  border: 2px solid grey;
  border-radius: 3px;
  animation: ${morph} 0.75s linear;
  background-color: #010718;
  ::placeholder {
    color: white;
  }
`;
