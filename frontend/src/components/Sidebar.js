import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return <Wrapper>Sidebar</Wrapper>;
};

const Wrapper = styled.div`
  height: 100%;
  grid-area: sidebar;
  border: 2px solid red;
`;
export default Sidebar;
