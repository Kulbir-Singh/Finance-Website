import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Posts() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch("/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);
  return (
    <Wrapper>
      <div>
        {users &&
          users.map((user) => {
            return <div></div>;
          })}
      </div>
      <UsersInfo>
        {users &&
          users.map((user) => {
            return (
              <Link to={`/user/${user.username}`}>
                <UserInfo>
                  <UserImg src={user.photo} /> <p>{user.firstName}</p>
                  <p>{user.lastName + " "}</p>
                </UserInfo>
              </Link>
            );
          })}
      </UsersInfo>
    </Wrapper>
  );
}

const UsersInfo = styled.div`
  flex-direction: column;

  position: sticky;
  height: 70vh;
  top: -3.5%;
  overflow: auto;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
`;

const UserInfo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 0 5% 0;
  border-radius: 5px;
  background-color: white;
  border: 2px solid #e9eaf0;
`;

const Wrapper = styled.div`
  padding: 2%;
  padding-top: 3.5%;
  padding-bottom: 0px;
  padding-right: 2%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1.7fr 0.3fr;
  grid-template-rows: 1fr;
  gap: 5px 5px;
  grid-template-areas: ". .";
`;
