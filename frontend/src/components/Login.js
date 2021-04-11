import React, { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";

export default function Login() {
  //using useRef to get the values from the inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  console.log(currentUser);
  //this is the onsubmit function that will handle the password and email verification
  //it will return an error if the password dont match of if the account hasnt been created
  const handleSubmit = async (e) => {
    console.log(currentUser);
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("failed to sign in");
    }
    setLoading(false);
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
