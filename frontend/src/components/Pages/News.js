import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function News() {
  const [articles, setArticles] = useState();
  //   useEffect(() => {
  //     fetch(
  //       "https://newsapi.org/v2/everything?q=bitcoin&apiKey=38801c44ca8e410290a82a2529881168"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => setArticles(data.articles));
  //   }, []);
  //   console.log(articles);

  return articles ? (
    <Wrapper>
      hello
      <p>hello</p>
      {articles.map((article) => {
        return (
          <>
            <Article>
              <Title>{article.title}</Title>
              <img src={article.urlToImage} />
              <Content>{article.content}</Content>
              <Description>{article.description}</Description>
              <PublishedAt>{article.publishedAt}</PublishedAt>
              {/* <Source>{article.source}</Source> */}
            </Article>{" "}
          </>
        );
      })}
    </Wrapper>
  ) : (
    <div>News</div>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  border: 2px solid red;
`;

const Article = styled.div``;

const Description = styled.div``;

const PublishedAt = styled.p``;

const Source = styled.p``;

const Content = styled.p``;

const Author = styled.p``;

const Title = styled.p``;
