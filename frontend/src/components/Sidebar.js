import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.userInfo);
  console.log("thisis ", user.USERINFO);
  return (
    <>
      {" "}
      <Wrapper>
        {user.USERINFO && (
          <UserInfo>
            <UserImg src={user.USERINFO.photo} />
            <h3>{user.USERINFO.username}</h3>
          </UserInfo>
        )}
        {!user.USERINFO && (
          <div>
            <h3>Guest</h3>
          </div>
        )}
        <Discover>
          <h3>Discover</h3>
          <Link to="/">
            <p>Home</p>
          </Link>
          {/* <Link to="/featured">
            <p>Featured</p>
          </Link> */}
          {/* <Link>
            <p>Categories</p>
          </Link> */}
          <Link to="stocks">
            <p>Popular Stocks</p>
          </Link>
          <Link to="/news">
            <p>Headlines</p>
          </Link>
        </Discover>
        {user.USERINFO && (
          <Discover>
            <h3>For You</h3>
            <Link to="bookmarks">
              <p>Bookmarked</p>
            </Link>
            <Link>
              <p>Portfolio</p>
            </Link>
            <Link>
              <p>Messages</p>
            </Link>
            <Link>
              <p>Favorite Stocks</p>
            </Link>
          </Discover>
        )}
        <Discover>
          <h3>Finance</h3>
          <Link>
            <p>Investments</p>
          </Link>
          <Link>
            <p>Day Trading</p>
          </Link>
          <Link to="/stocks">
            {" "}
            <p>Stocks</p>
          </Link>
          <Link>
            <p>Financial Statements</p>
          </Link>
        </Discover>
      </Wrapper>
    </>
  );
};

const Discover = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  h3:nth-child(n) {
    color: #00aaff;
  }
  p:nth-child(n) {
    color: #737475;
    margin: 10px 5px;
    transition-duration: 0.3s;
    :hover {
      color: black;

      transform: scale(1.1);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Wrapper = styled.div`
  grid-area: sidebar;
  padding-top: 20px;
  padding-left: 20px;
  margin: none;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e9eaf0;
  h3:nth-child(n) {
    margin: 5px 0;
  }
`;
export default Sidebar;
