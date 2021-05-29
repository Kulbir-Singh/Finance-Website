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
        menu={menu}
      >
        {menu && <H1>˂</H1>}
        {!menu && <H1>≡</H1>}
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

const H1 = styled.p`
  font-weight: bold;
  font-size: 35px;
`;

const Menu = styled.button`
  position: fixed;
  z-index: 11;
  left: 0;
  border: none;
  background-color: transparent;
  transform: ${(props) =>
    props.menu ? "translateX(265px)" : "translateX(0px)"};
  color: ${(props) => (props.menu ? "white" : "black")};
  transition-duration: 1s;
  border-radius: 4px;
  top: 9%;
  border-top-right-radius: 0px;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
  text-decoration: none;
  outline: none;
`;

const NavbarLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  width: 300px;
  z-index: 10;
  transform: ${(props) =>
    props.menu ? "translateX(0)" : "translateX(-300px)"};
  transition-duration: 1s;
  height: 100vh;
  background-color: #041c61;
  padding-top: 50px;
  padding-left: 2%;
  border-bottom-right-radius: 5px;
  position: fixed;
  left: 0;
  top: 9%;
  box-shadow: ${(props) =>
    props.menu
      ? "0 0px 0px 0px white, 0 0px 0px 0px white,12px 0 15px -4px rgba(31, 73, 125, 0.8),-12px 0 15px -4px rgba(31, 73, 125, 0.8)"
      : ""};
`;
