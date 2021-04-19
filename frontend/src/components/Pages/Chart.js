import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import styled from "styled-components";

export default function ChartInfo({ stockId, stock, setStock }) {
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

  if (stock && intervals && stockPrice) {
    return (
      <Wrapper>
        <ChartDraw>
          <Line
            data={{
              labels: intervals,
              datasets: [
                {
                  label: `${stock.meta.symbol}`,
                  data: stockPrice,
                  borderWidth: 1,
                  fill: false,
                  borderColor: "red",
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
`;

const Article = styled.div`
  margin: 10px 0;
`;
const NewsSection = styled.div``;

const ChartDraw = styled.div`
  width: 90%;
  height: 450px;
  border: 2px solid lightgrey;
`;
