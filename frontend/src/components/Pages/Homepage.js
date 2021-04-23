import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
// import Connection from "../";
import ChartInfo from "./Chart";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Homepage() {
  const [stock, setStock] = useState();
  const [articles, setArticles] = useState();
  const [article, setArticle] = useState();
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?category=business&page=2&language=en&apiKey=38801c44ca8e410290a82a2529881168`
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
    fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&page=2&language=en&apiKey=38801c44ca8e410290a82a2529881168`
    )
      .then((res) => res.json())
      .then((data) => setArticle(data.articles));
  }, []);
  if (article) {
    console.log(article);
  }
  return (
    <Wrapper>
      <a onClick={() => window.open(article[0].url)}>
        <StocksWrapper>
          <Trending>Trending News</Trending>
          <Bar></Bar>
          <NewsInfo>
            {article && <StockImg src={article[0].urlToImage} />}
            {article && <p>{article[0].description}</p>}
          </NewsInfo>
        </StocksWrapper>
      </a>
      <Container>
        <CarouselContainer>
          <Carousel autoPlay={true}>
            {articles &&
              articles.map((article) => {
                return (
                  <div>
                    <a onClick={() => window.open(article.url)}>
                      <CarouselImg src={article.urlToImage} />
                      <CarouselTxt>{article.title}</CarouselTxt>
                    </a>
                  </div>
                );
              })}
          </Carousel>
        </CarouselContainer>
        <NewsWrapper>
          {
            <ChartInfo
              stockId={"AAPL"}
              stock={stock}
              setStock={setStock}
              stockHeight={100}
              stockWidth={100}
            /> /* <StockImg src={Connection} /> */
          }
        </NewsWrapper>
      </Container>
    </Wrapper>
  );
}
const Bar = styled.div`
  width: 97%;
  margin-left: 1%;
  border: 2px solid black;
`;
const Trending = styled.p`
  font-size: 45px;
  font-weight: bold;
  color: black;
  margin: 20px 0 0px 20px;
`;

const createBox = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1.1);
  }
`;
const Button = styled.div`
  border: 2px solid red;
  width: 10px;
`;
const StockImg = styled.img`
  width: 50%;
  height: 500px;
  margin: 20px;
  border-radius: 20px;
`;

const NewsInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1%;
  color: black;
`;

const NewsWrapper = styled.div`
  width: 50%;
  height: 700px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 50px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    2px 11px 28px -10px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 2px 11px 28px -10px rgba(0, 0, 0, 0);
  transition-duration: 3s;
  :hover {
    transform: scale(1.1);
  }
`;

const StocksWrapper = styled.div`
  width: 100%;
  height: 700px;
  cursor: pointer;

  background-image: url("/connection.jpg");
  background-size: cover;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 50px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    2px 11px 28px -10px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 2px 11px 28px -10px rgba(0, 0, 0, 0);
  transition-duration: 3s;
  :hover {
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;
const Container = styled.div`
  display: flex;
`;

const CarouselContainer = styled.div`
  width: 45%;
  margin-right: 5%;
`;

const CarouselImg = styled.img`
  border-radius: 20px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  height: 69vh;
`;

const CarouselTxt = styled.div`
  padding: 0 20px;
  color: black;
  background-color: white;
  z-index: 2;
  border: 2px solid black;
  border-radius: 20px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
