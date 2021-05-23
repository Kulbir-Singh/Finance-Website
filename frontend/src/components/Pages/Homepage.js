import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// import Connection from "../";
import ChartInfo from "./Chart";
import Profile from "./Profile";
import InvestImg from "../../Resources/investing.svg";
import PortfolioImg from "../../Resources/portfolioimg.svg";
import StockImg from "../../Resources/stocksimg.svg";
import FinancialImg from "../../Resources/financialimg.svg";

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
      "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=6V7SDPMNJBB6NGXM"
    )
      .then((res) => res.json())
      .then((data) => console.log("this is alpha data", data));
  }, []);
  if (articles) {
    console.log(articles);
  }

  if (articles) {
    return (
      <Wrapper>
        <Stocks>
          <Tag>Stocks </Tag>{" "}
          <Stock1 to="/stocks/AAPL/Apple%20Inc">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACXCAMAAAAvQTlLAAAAVFBMVEX///9mZmZgYGBjY2NdXV38/Pzn5+daWlrx8fHf39+rq6v19fVubm5paWm0tLScnJy8vLyWlpbOzs58fHyjo6OMjIxzc3PHx8fY2NiDg4NVVVVPT09ssxvzAAAFDklEQVR4nO2ci3LjKgyGjQBj4/v9su//ngenaTaJSVtkVLxn8s/O7HQmnXwVspAEchS99dY/rCSt9ZL3MjTHo2bd5UKBqM7EldXjCpwZwZm4pkVcoM7FlQ7qk4oxoUPjfKrNgbHTccle8DsspurQRBdlvWAPWtvQSJuy4QmL/clCMxnJ6hmLraGZootvPWPBEBrKqN5hMTiB20+ww+JjHJoqike+N1f4aC+HvbnYnzk0ls25GC9CU0Vxvl9FxqfQWNE+RBisIXhQTfdUJqamobGs5hJVaKooscWIJQmNFU17c3ERPqRG+/2a8RPsQNl+GVUZGspo3mFBeJ+PLLFeVMEj1yYtzmgt4/YPWzaHOngWcZFs7rlgPEWpET1yQVGFD6dX3bg4wJCeYw03yUYBgBLFok8Q4+/UNkZ6Sk8RHL6VzJJNWUa5sjJua611pcv2J2sl46mshm7szL+h0fVMYcokLQdQSolN5j/WfLlkSVo3zHwY+FUgzE9L6XmZk3op1GOtA5uLv0hGW90VAizpmCqGyR9Z2q/KUlGY9EoxPT+FqmSuuBK2j1/RoPQT3LKysCTINzTW3VstLjv++tPXX+k8bAay5eq771l53yYyyuJpWV9b6u431uFwjNP8J18k+NjoYRSWctsqMR4rwuPlG2P9RQPxk7/g9vH1SL4Rdz81gLsOdJ9mRodlKl6NtJitaeRTgOtcxDmltTatKDBbL8uvMJ1Ek09RY5lw0TlvShOtb10Eytn1U5dghMVCRP2G3rmUds8sbI1Sz1gFYvPOOupVBIbJKTT1s4g7a7B1/vxiCVQ6UVJ7F0clhuTepXoMlu3syatgwSUSDfUy4nLVmJhK4FaRfBmRvXNJvAVhT0DIgxeyEtr3u70Kfb5W0+5B6LMGy3GKVy7suR9tsOcFsjjLKKkO3PEgjqpo92qJoxf2FL4mjvbYPk5Jy5VjH0dNzIVtyL25/h9c/Um5zmovYi50/CLmQvYuybnQ+yNxvIcGyUW8P3KGzL+I8wkmkBtkSlwNYe+8J9QtpgVZDxW0XAyQh48LdTcH+UTabi96FbJSI65r0Q0K4j4Aw3qY9TKxXy5UvzBbyA2G6q/KivwIBpftUFeQRpwjnknqnWgTYKI+dcNwk+jcL8MQd8A+BO59Q+pU5wpWuPpYXPzCQhrnzx3jK3Wn/Aa2Nm5VG/l52qegcyqPYuoc7CauutbB/+mvdNwE4HBXwTISQQfmcK8pIc8p/oq7+D550nqTW+OcPjn8lGOD+rc8nzvuk/QXTj7kWubS3zi5ynWTfB4joZF7MUl+bPvB5Z5Q/8YmCYN7ZfQbBkN1NekNhiskE/JHUuBaO9QxDONdmyRxy4lje/m0uyT2nk5Em1bwET9OQRkrxJEZ15aMC+v0V1GtJC+OTXhkI80zeWgVN800WM3hebWSoA/Mcw+jTRQptY8p19j7Pulp3jy1TMAdkcCeQT7Lb8fV4zsWfPo+R18J2Ev6uwLMc5+vh5GVJ4tx9EWFF2C7l1Q9fBuHy3wrGH05sMKZ77fDyP6lxQTkg67nJMuSudbNyK3DpZsAff3rKzDbyOU2XthM8V3Pz8CVnbIOHYqO5OUw8/i0lsYwY28N3Vld5fAUXTijelFTrNdbiOVcqFy/nuOW8TRcxqRvf0PR0s2Wx2VXKOPeindN/W0ckpMeRnaZ+i6WifZdBsZ7+qExXv6zrzHeNtV1/a+8NuCtt97a6z9QYUzlCJrDIQAAAABJRU5ErkJggg==" />
            <Bar></Bar>
            <CompanyInfo>Technology company</CompanyInfo>
            <SubCompanyInfo>since last week</SubCompanyInfo>{" "}
          </Stock1>
          <Stock2 to="/stocks/TSLA/Tesla%20Inc">
            <img src="data:image/png;base64,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" />
            <Bar></Bar>
            <CompanyInfo>Electric car company</CompanyInfo>
            <SubCompanyInfo>since last week</SubCompanyInfo>
          </Stock2>
          <Stock3 to="/stocks/NFLX/Netflix%20Inc">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACXCAMAAAAvQTlLAAAAclBMVEX////lCRTkAAD3xsflAA7lAAnsbnH4uLztV17pSE3+7u7xgYbyiI3mJSr0r7DsSVH0pKftXmTnKjH6y87529v+9/fwe4DnGSTmEBr96er509T4zs/0n6L3vb/sUVfsRU3tZmrxkZToOj/qMzvwdXrzmJuT1WQdAAADtklEQVR4nO2YjY6iMBRGoZTRQWEUBQqKosj7v+L2loJlMLazu2STzXdiMtdOgUN/bls9DwAAAAAAAAAAAAAAAAAAAAAAAAAAgP+PgIhUWFJYjdFIlXnZaVISnGZFpXn9QDSU9JX1/yp1gcWLM0lf6UxhQ9GKmawjr/yclLDPyIvuk5Kz5yX09zJ5aSr5Iq+contGhVk6lL4j5r7PchXuQhl+9F7+E7aXXpfQN4ukavRpFvEdeVHlqRfVpagW3OdipUK6OTs4eHE/WtorWlOYU4PRdeE1c/Dy2eqFFw97ei8mI+7rYnYZvIY6zOLldTLk6VGOLkE9lFi0tNdl7sWL65fiupESOX1JqW1TKpIvrrzE/UuzsniVqvek/VYG4f3o5MXFcebFmllT0y3ZVn8hL56a0++tl0cdGbbe8R4aN7F4+eF57rWPvtfdzL3M4fveK1ANVlElLmyjfvBSjbOsV6Qaar+nZrtatbQXL4KlvWR6pI5Rw7l29fJZt7jXKeU6p6S2JPH0CmUuto77F14ndy+v0VmR1gZXL5+dvueJe9d1t+1m9cbL9+OU6Ke9zSvpvXhrTRKm12OWV/uF7/HWixOhqFy8sqKfY7mDls5f8hO/XofMu7zw6lugcPLyHup1xcpzgLzEVyFHWJIs7aVyvkuS0F7hueVSYMd/3I+6DnPzOiivyU7orRc7rEM//PwQk3GffuSb7XZj5Jr5fIyToyJz8rqo141dhn3vFagGaotl88SpHx3s5u6VsWFaLpdXvVx7rUtnL2/PFvdSOwmVWsxGtnjVy3udh0nulMC01/AyC+4nWnqCeG7bnbzGzjfG/d/1UlOLdW676KdXMu/HY1RKquAwTEwHLx43H/m2263UmdT06jfh2eMH+y/yilo+9eLxPRXD+dHZa8y06ihjeAV6f19TNhb2kT946Rlp5nuJKtr/xGtcv+qp10Ofh460TDiksNGr/u41PsHw4vzpdZWNErt6HdRz6NobdeTFmsJGr0zwuReno+HYj1sRp0Wnv2Sbpmke5pqSsLETJVOvmxoZ9Bbq/Bhad9KjV78LGbw0RXtp8mQY92UlGd80iyTmraITEdRJt82b68HTv0/QOl3G1NT9in2ljsxdztu914mxUAiV86r8tqvJwGEj/o7sWK12NAGStI2FPm6oaRvaUlgc6jb3ytvtnAQua9fvUEpDLVvo33/e4sfr/LyUzGuq+ta0raVSlv1hX/0e/+apAAAAAAAAAAAAAAAAAAAAAAAAAADgv+EXdt8/epX0z40AAAAASUVORK5CYII=" />
            <Bar></Bar>
            <CompanyInfo>Production company</CompanyInfo>
            <SubCompanyInfo>since last week</SubCompanyInfo>
          </Stock3>
        </Stocks>
        <News>
          <Tag>News </Tag>
          <Category>
            <p>Business ˃</p>
            <p>Sports ˃</p>
            <p>Entertainment ˃</p>
            <p>Science ˃</p>
          </Category>
          <VertBar></VertBar>
          <Articles>
            <Trending>
              Trending
              <TrendingImg src={articles[0].urlToImage} />
              <h5>Author: {articles[0].author}</h5>
              <h6> {articles[0].title}</h6>
            </Trending>
            <Featured>
              <Article1>
                <Article1Img src={articles[1].urlToImage} />
                <h5>Author: {articles[1].author}</h5>
                <h6> {articles[1].title}</h6>
              </Article1>
              <Article2>
                <Article2Img src={articles[2].urlToImage} />
                <h5>Author: {articles[2].author}</h5>
                <h6> {articles[2].title}</h6>
              </Article2>
            </Featured>
          </Articles>
        </News>
        <BeginnerSection>
          <BeginnerHeader>New To Finance</BeginnerHeader>
          <BeginnerTags>
            <StockTag>
              Stocks
              <img src={StockImg} />
            </StockTag>
            <InvestmentTag>
              Investments
              <img src={InvestImg} />
            </InvestmentTag>
            <ProfileTag>
              Portfolio
              <img src={PortfolioImg} />
            </ProfileTag>
            <FinancialTag>
              Financial Statements
              <img src={FinancialImg} />
            </FinancialTag>
          </BeginnerTags>
        </BeginnerSection>
      </Wrapper>
    );
  } else {
    return (
      <Default>
        <Stocks>
          <p>Stocks :</p>
        </Stocks>
        <Stocks></Stocks>
      </Default>
    );
  }
}
const ProfileTag = styled.div`
  border: 2px solid #e9eaf0;
  background-color: white;
`;
const InvestmentTag = styled.div`
  border: 2px solid #e9eaf0;
  background-color: white;
`;
const FinancialTag = styled.div`
  border: 2px solid #e9eaf0;
  background-color: white;
`;
const StockTag = styled.div`
  border: 2px solid #e9eaf0;
  background-color: white;
`;
const BeginnerTags = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 100%;
  gap: 20px 20px;
  background-color: #f5f6fa;
  border: 2px solid #e9eaf0;
  div:nth-child(n) {
    border-radius: 5px;
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    color: #737475;
    display: flex;
    justify-content: space-between;
  }
  :nth-child(n) {
    padding: 20px;
    border-radius: 5px;
  }
  img:nth-child(n) {
    width: 50%;
  }
`;

const BeginnerHeader = styled.div`
  width: 50%;
  font-size: 35px;
  color: #737475;
`;

const BeginnerSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  min-height: 750px;
  border-radius: 5px;
  border: 2px solid #e9eaf0;
  background-color: white;
  padding: 2.5%;
  margin: 2.5% 0;
  font-size: 25px;
`;

const TrendingImg = styled.img`
  width: 104%;
  height: 55%;
  margin: 20px 0;
  margin-left: -2%;
`;
const Article1Img = styled.img`
  height: 80%;
  width: 100%;
`;

const Article2Img = styled.img`
  height: 80%;
  width: 100%;
`;
const VertBar = styled.div`
  border: 1px solid #e9eaf0;
  margin-right: 15px;
  height: 105%;
`;
const Article2 = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  width: 95%;
  height: 47.5%;
  background-color: white;
  border-radius: 5px;
  /* border: 2px solid #e9eaf0; */
  :nth-child(n) {
    color: #737475;
  }
`;
const Article1 = styled.div`
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 47.5%;
  border-radius: 5px;
  /* border: 2px solid #e9eaf0; */
  background-color: white;
  :nth-child(n) {
    color: #737475;
  }
`;
const Featured = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 50%;
  height: 100%;
`;
const Trending = styled.div`
  display: flex;
  flex-direction: column;
  h6:nth-child(n) {
    margin: 20px 0;
    font-size: 15px;
  }
  /* justify-content: space-between; */
  padding: 10px;
  flex-direction: column;
  border: 2px solid #e9eaf0;
  color: #737475;
  border-radius: 5px;
  /* margin: 0px 5px; */
  height: 100%;
  width: 50%;
  background-color: white;
`;

const Articles = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  padding-left: 2%;
  padding-right: 2%;
  :nth-child(2) {
    color: #737475;
    font-size: 20px;
  }
  width: 25%;
  height: 100%;
`;

const News = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  min-height: 750px;
  border-radius: 5px;
  border: 2px solid #e9eaf0;
  background-color: white;
  padding: 2.5%;
  margin: 2.5% 0;
  font-size: 25px;
`;

const SubCompanyInfo = styled.p`
  color: #a7a8ab;
  font-size: 17px;
`;

const CompanyInfo = styled.p`
  font-size: 20px;
  text-align: center;
  padding-bottom: 20px;
  color: #737475;
`;

const Tag = styled.div`
  height: 100%;
  color: #737475;
  font-size: 35px;
`;
const Stock3 = styled(Link)`
  display: flex;
  height: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #e9eaf0;
  width: 25%;
`;
const Stock2 = styled(Link)`
  display: flex;
  height: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #e9eaf0;
  width: 25%;
`;
const Stock1 = styled(Link)`
  display: flex;
  height: 75%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #e9eaf0;
  width: 25%;
`;

const Default = styled.div``;

const Stocks = styled.div`
  display: flex;
  overflow: auto;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  min-height: 750px;
  border-radius: 5px;
  font-size: 25px;
  border: 2px solid #e9eaf0;
  background-color: white;
  padding: 2.5%;
  padding-right: 5%;
  margin: 2.5% 0;
`;

const Bar = styled.div`
  border: 1px solid #e9eaf0;
  width: 90%;
  margin: 50px 0 25px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-items: center;
  overflow: auto;
  padding: 1% 2.5%;
  height: 100%;
`;
