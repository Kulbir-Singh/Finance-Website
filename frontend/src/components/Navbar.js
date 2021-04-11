import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import styled from "styled-components";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(menu);
  }, [menu]);
  return (
    <Wrapper menu={menu}>
      <button onClick={() => setMenu(!menu)}>X</button>
      {menu && (
        <div>
          <h1>Menu</h1>
          <p>News</p>
          <p>Stocks</p>
          <p>Bookmarked</p>
          {currentUser && <p>Profile</p>}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(props) => (props.menu ? "100px" : "0")};
  background-color: red;
`;
