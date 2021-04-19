import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <Menu
        onClick={() => {
          setMenu(!menu);
        }}
      >
        <h1>≡</h1>
      </Menu>
      <Wrapper menu={menu} id="navbar">
        {menu && (
          <NavbarLinks>
            <Link
              to="/news"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              ᐅ News
            </Link>
            <Link
              to="/stocks"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              ᐅ Stocks
            </Link>
            {currentUser && (
              <Link
                to="/bookmarks"
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                ᐅ Bookmarked
              </Link>
            )}
            {currentUser && (
              <Link
                to="/profile"
                onClick={() => {
                  setMenu(!menu);
                }}
              >
                ᐅ Profile
              </Link>
            )}
          </NavbarLinks>
        )}
      </Wrapper>
    </>
  );
}

const Menu = styled.button`
  position: absolute;
  z-index: 10;
  left: 0;
`;

const NavbarLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  width: 400px;
  transform: ${(props) =>
    props.menu ? "translateX(0)" : "translateX(-400px)"};
  transition-duration: 1s;
  height: 90%;
  background-color: white;
  padding-top: 50px;
  padding-left: 2%;
  position: absolute;
  left: 0;
  box-shadow: ${(props) =>
    props.menu
      ? "0 0px 0px 0px white, 0 0px 0px 0px white,12px 0 15px -4px rgba(31, 73, 125, 0.8),-12px 0 15px -4px rgba(31, 73, 125, 0.8)"
      : ""};
`;
