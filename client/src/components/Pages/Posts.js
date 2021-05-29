import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Posts() {
  const [users, setUsers] = useState();
  const user = useSelector((state) => state.userInfo);
  useEffect(() => {
    fetch("/allusers")
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);
  return (
    <Wrapper>
      <Post>
        {user.USERINFO && (
          <NewPost>
            <div>
              <UserImg src={user.USERINFO.photo} />
            </div>
            <div>
              <NewInput />
              <NewPostButton></NewPostButton>
            </div>
          </NewPost>
        )}
        <div>
          {users &&
            users.map((user) => {
              return <div></div>;
            })}
        </div>
      </Post>
      <UsersInfo>
        {users &&
          users.map((user) => {
            return (
              <Link to={`/user/${user.username}`}>
                <UserInfo>
                  <UserImg src={user.photo} /> <p>{user.firstName}</p>
                  <p>{user.lastName}</p>
                </UserInfo>
              </Link>
            );
          })}
      </UsersInfo>
    </Wrapper>
  );
}

const NewPostButton = styled.button`
  margin: 10px;
  border-radius: 10px;
  outline: none;
  background-color: white;
  border: 2px solid #e9eaf0;
  margin-right: 20px;
  height: 50px;
  width: 100px;
`;

const NewInput = styled.textarea`
  width: 95%;
  height: 100%;
  border: none;
  margin: 20px 20px 0 0;
  border-bottom: 2px solid #e9eaf0;
  resize: none;
  :focus {
    outline: none;
  }
`;

const NewPost = styled.div`
  display: flex;
  background-color: white;
  width: 100%;
  border: 2px solid #e9eaf0;
  height: 250px;
  /* border: 2px solid green; */
  align-items: flex-end;
  div:nth-child(1) {
    height: 100%;
    padding-left: 10px;
  }
  div:nth-child(2) {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-end;
  }
`;

//*[@id="dynamic-xbrl-form"]/div[24]/table/tbody/tr[4]/td[4]/p
//*[@id="dynamic-xbrl-form"]/div[28]/table/tbody/tr[4]/td[4]/p
//*[@id="dynamic-xbrl-form"]/div[295]/table/tbody/tr[3]/td[3]/span

const Post = styled.div``;

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
  p:nth-child(n) {
    margin-left: 10px;
  }
`;

const Wrapper = styled.div`
  padding: 2.5%;
  padding-top: 2.5%;
  padding-bottom: 0;
  padding-right: 2%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1.5fr 0.4fr;
  grid-template-rows: 1fr;
  gap: 2.5% 2.5%;
  grid-template-areas: ". .";
`;
