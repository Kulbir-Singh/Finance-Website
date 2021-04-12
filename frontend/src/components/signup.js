import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Signup() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const history = useHistory();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //this is the onsubmit function that will handle the password and email verification
  //it will return an error if the password dont match of if the account hasnt been created
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("passwords don't match");
    }
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
          console.log(data);
          setLoading(false);
          history.push("./");
        });
      console.log(info);
    } catch {
      setError("account not created");
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
