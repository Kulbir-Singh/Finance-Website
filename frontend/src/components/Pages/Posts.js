import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Posts() {
  return (
    <Wrapper>
      <div>these are the posts</div>
      <div>these are the users</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2%;
  padding-top: 3.5%;
  padding-bottom: 0px;
  padding-right: 2%;
  display: flex;
  flex-direction: column;
  height: 100%;
  display: grid;
  grid-template-columns: 1.7fr 0.3fr;
  grid-template-rows: 1fr;
  gap: 5px 5px;
  grid-template-areas: ". .";
  div:nth-child(1) {
    height: 100%;
    border: 2px solid red;
  }
  div:nth-child(2) {
    height: 95%;
    border: 2px solid red;
  }
`;
