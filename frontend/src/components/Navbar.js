import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(menu);
  }, [menu]);

  onmousedown = () => {
    if (menu && document.getElementById("navbar")) {
      //   setMenu(!menu);
    }
  };
  return (
    <Wrapper menu={menu} id="navbar">
      <button
        onClick={() => {
          setMenu(!menu);
        }}
      >
        X
      </button>
      {menu && (
        <div>
          <h1>Menu</h1>
          <Link
            to="/news"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            News
          </Link>
          <p>Stocks</p>
          <p>Bookmarked</p>
          {currentUser && <p>Profile</p>}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(props) => (props.menu ? "400px" : "0")};
  height: 85%;
  background-color: #162252;
  position: absolute;
  left: 0;
`;
