import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Connection from "../../Resources/connection.jpg";
import ChartInfo from "./Chart";

export default function Homepage() {
  const [stock, setStock] = useState();
  const [state, setstate] = useState();
  return (
    <Wrapper>
      <StocksWrapper>{<StockImg src={Connection} />}</StocksWrapper>
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
    </Wrapper>
  );
}

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

const StockImg = styled.img`
  width: 100%;
  height: 700px;
  border-radius: 20px;
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
