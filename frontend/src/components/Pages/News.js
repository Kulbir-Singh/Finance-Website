import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { receiveUserInfo, requestUserInfo } from "../../Actions";

export default function News() {
  const [savedArticle, setSavedArticle] = useState();
  const [articles, setArticles] = useState();
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
          uid: user.USERINFO.data.uid,
          title: article.title,
          url: article.url,
          image: article.urlToImage,
        };
        setSavedArticle(newSavedArt);
        fetch("/addpost", {
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
  const ShareArticle = async (e) => {
    e.preventDefault();
    console.log("shared");
  };
  console.log("rendered");
  return articles ? (
    <Wrapper>
      <Category>
        <Button
          onClick={() => {
            setUrlInfo({ ...urlInfo, catgory: "general" });
          }}
        >
          General
        </Button>
        <Button
          onClick={() => {
            setUrlInfo({ ...urlInfo, catgory: "business" });
          }}
        >
          Business
        </Button>
        <Button
          onClick={() => {
            setUrlInfo({ ...urlInfo, catgory: "entertainment" });
          }}
        >
          Entertainment
        </Button>
        <Button
          onClick={() => {
            setUrlInfo({ ...urlInfo, catgory: "science" });
          }}
        >
          Science
        </Button>
        <Button
          onClick={() => {
            setUrlInfo({ ...urlInfo, catgory: "technology" });
          }}
        >
          Technology
        </Button>
      </Category>
      {articles.map((article) => {
        return (
          <>
            <Article>
              <Title>{article.title}</Title>
              <Img src={article.urlToImage} />
              <Content>{article.content}</Content>
              <Description>{article.description}</Description>
              <PublishedAt>{article.publishedAt}</PublishedAt>
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
                {currentUser && <Shared onClick={ShareArticle}>share</Shared>}
              </Actions>
            </Article>{" "}
          </>
        );
      })}
    </Wrapper>
  ) : (
    <div>News</div>
  );
}

const Actions = styled.div``;
const Shared = styled.button``;
const Saved = styled.button``;

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
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
`;

const Img = styled.img`
  width: 400px;
  height: 200px;
`;

const Article = styled.div``;

const Description = styled.div``;

const PublishedAt = styled.p``;

const Source = styled.p``;

const Content = styled.div`
  width: 100%;
  height: 50px;
`;

const Author = styled.p``;

const Title = styled.p``;
