import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { receiveUserInfo, requestUserInfo } from "../../Actions";
import SharedPost from "./SharedPost";
import Notification from "../Pages/Notifcation";

export default function News() {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [articles, setArticles] = useState();
  const [notifcationModal, setNotificationModal] = useState();
  const { currentUser } = useAuth();
  const user = useSelector((state) => state.userInfo);
  const [urlInfo, setUrlInfo] = useState({
    catgory: "business",
  });
  useEffect(() => {
    console.log(user);
    const ac = new AbortController();
    fetch(
      `https://newsapi.org/v2/top-headlines?category=${urlInfo.catgory}&page=2&language=en&apiKey=38801c44ca8e410290a82a2529881168`
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
    return () => ac.abort();
  }, [urlInfo]);
  const SaveArticle = async (article) => {
    try {
      if (user.USERINFO) {
        console.log(user.USERINFO);
        const newSavedArt = {
          uid: user.USERINFO.uid,
          title: article.title,
          url: article.url,
          image: article.urlToImage,
        };
        fetch("/addbookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSavedArt),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("this is the data", data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(articles);
  onscroll = () => {
    switch (window.scrollY) {
      case 500:
        console.log("busines");
        break;
      case 600:
        console.log("technology");
        break;
      default:
        console.log("hello");
    }
    console.log(window.scrollY);
  };

  const ShareArticle = async (article) => {
    console.log(article);
    if (user.USERINFO && article) {
      const ArticleInfo = {
        from: user.USERINFO.uid,
        user: user.USERINFO,
        to: "",
        isread: false,
        url: article.url,
        photo: article.urlToImage,
        content: article.title,
        message: "",
      };
      setModal(true);
      setModalContent(ArticleInfo);
    }
  };

  var lastScrollTop = 0;
  window.addEventListener("scroll", function (event) {
    if (window.scrollY > lastScrollTop) {
      console.log("down");
    } else {
      console.log("up");
    }
    lastScrollTop = window.scrollY;
  });

  return articles ? (
    <Wrapper>
      <SharedPost
        setModal={setModal}
        modal={modal}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      {articles.map((article) => {
        return (
          <>
            <Article>
              <Img src={article.urlToImage} />
              <Info>
                <Title>
                  {article.title}
                  <a href={article.url} /> ➤{" "}
                </Title>{" "}
                <Description>{article.description}</Description>
                <Actions>
                  {/* get all the bookmarked for this user and then use the .find method to see if the current 
                article is bookmarked if it is then you do a  {bookmarked? saved}{!bookmarked?} */}
                  {currentUser && (
                    <Saved
                      onClick={() => {
                        SaveArticle(article);
                      }}
                    >
                      save
                    </Saved>
                  )}
                  {currentUser && (
                    <Shared onClick={() => ShareArticle(article)}>share</Shared>
                  )}
                </Actions>
                {/* <Content>{article.content}</Content> */}
              </Info>
              {/* <PublishedAt>{article.publishedAt}</PublishedAt> */}
            </Article>{" "}
          </>
        );
      })}
    </Wrapper>
  ) : (
    <div>News</div>
  );
}

const Actions = styled.div`
  display: flex;
`;
const Shared = styled.button``;
const Saved = styled.button`
  margin-right: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 15px;
  justify-content: space-around;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  text-decoration: none;
  outline: none;
  border: none;
  color: white;
  width: 19%;
  font-size: 18px;
  background-color: #162252;
  height: 50px;
  border: 2px solid blue;
  border-bottom-left-radius: 10px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 30px;
  height: 100%;
`;

const Img = styled.img`
  width: 250px;
  height: 100%;
  padding: 15px;
  border-radius: 30px;
  transition-duration: 2s;
  :hover {
    transform: scale(1.1);
  }
`;

const Article = styled.div`
  display: flex;
  margin: 50px 0;
  width: 100%;
  height: 250px;
  border-radius: 20px;

  /* -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    -8px 3px 50px -5px rgba(0, 0, 0, 0.36);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    -8px 3px 50px -5px rgba(0, 0, 0, 0.36); */
  /* border: 2px solid #5c80ff; */
  background-image: linear-gradient(
    to left top,
    #d1e3ff,
    #e0e9ff,
    #edf0ff,
    #f7f7ff,
    #ffffff
  );
  overflow: hidden;
`;

const Description = styled.div``;

const PublishedAt = styled.p``;

const Source = styled.p``;

const Content = styled.div`
  width: 100%;
  height: 50px;
`;

const Author = styled.p``;

const Title = styled.a`
  font-size: 20px;
  color: black;
  font-weight: bold;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
