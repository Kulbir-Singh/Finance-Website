import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {}, [menu]);

  onmousedown = () => {
    if (menu && document.getElementById("navbar")) {
    }
  };
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
          <div>
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
            {currentUser && <p>ᐅ Profile</p>}
          </div>
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

const Wrapper = styled.div`
  width: 400px;
  /* width: ${(props) => (props.menu ? "400px" : "0")}; */
  transform: ${(props) =>
    props.menu ? "translateX(0)" : "translateX(-400px)"};
  transition-duration: 1s;
  height: 85%;
  background-color: white;
  padding-top: 50px;
  padding-left: 2%;
  position: absolute;
  left: 0;
`;
