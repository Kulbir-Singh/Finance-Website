import ChartInfo from "./Chart";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

export default function Stock() {
  let { stockId, stockName } = useParams();
  const [stockNews, setStockNews] = useState();
  const [stock, setStock] = useState();
  useEffect(() => {
    if (stock) {
      fetch(
        `https://newsapi.org/v2/everything?q=${stockName}&language=en&apiKey=38801c44ca8e410290a82a2529881168`
      )
        .then((res) => res.json())
        .then((data) => setStockNews(data));
    }
  }, [stock]);
  console.log(stockNews);

  return (
    <Wrapper>
      stock
      <StockChart>
        <ChartInfo
          stockWidth={100}
          stockHeight={100}
          stockId={stockId}
          stock={stock}
          setStock={setStock}
        />
      </StockChart>
      <NewsSection>
        {stockNews?.articles?.map((article) => {
          return (
            <Article>
              <News href={article.url}>{article.title}</News>
            </Article>
          );
        })}
      </NewsSection>
    </Wrapper>
  );
}

const News = styled.a`
  color: black;
`;

const StockChart = styled.div`
  height: 700px;
  width: 60%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  margin-left: 5%;
`;

const Article = styled.div`
  margin: 10px 0;
`;

const NewsSection = styled.div``;