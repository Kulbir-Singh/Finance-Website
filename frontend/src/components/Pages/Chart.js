import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import styled from "styled-components";

export default function ChartInfo({
  stockWidth,
  stockHeight,
  stockId,
  stock,
  setStock,
}) {
  const [intervals, setIntervals] = useState([]);
  const [stockPrice, setStockPrice] = useState([]);

  useEffect(() => {
    fetch(
      `https://twelve-data1.p.rapidapi.com/time_series?symbol=${stockId}&interval=15min&format=json`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c5700c6ae1msh12bde36c477fe55p1ec385jsn37c9d32b7dce",
          "x-rapidapi-host": "twelve-data1.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setStock(data));
  }, []);
  console.log("thisis theh stock width", stockWidth);
  useEffect(() => {
    if (stock) {
      let arr = stock?.values?.map((item) => {
        let temp = item.datetime.split(" ");
        temp = temp[1].split(":00");
        return temp[0];
      });
      setIntervals(arr);
      let Price = stock?.values?.map((item) => {
        return Math.round(parseFloat(item.open) * 100) / 100;
      });
      setStockPrice(Price);
    }
  }, [stock]);
  console.log(stock);
  if (stock && intervals && stockPrice) {
    return (
      <Wrapper>
        <ChartDraw stockWidth={stockWidth} stockHeight={stockHeight}>
          <Line
            data={{
              labels: intervals,
              datasets: [
                {
                  label: `${stock.meta.symbol}`,
                  data: stockPrice,
                  borderWidth: 1,
                  fill: false,
                  borderColor: "#191454",
                },
              ],
            }}
            height={400}
            width={600}
            options={{ maintainAspectRatio: false }}
          />
        </ChartDraw>
      </Wrapper>
    );
  } else {
    return <>hello</>;
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-right: 30px;
`;

const Article = styled.div`
  margin: 10px 0;
`;
const NewsSection = styled.div``;

const ChartDraw = styled.div`
  width: ${(props) => props.stockWidth + "%"};
  height: ${(props) => props.stockHeight + "%"};
  border: 2px solid lightgrey;
`;
