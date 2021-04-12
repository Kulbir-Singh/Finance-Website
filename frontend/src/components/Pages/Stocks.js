import React, { useEffect } from "react";
// ask how to use procces.env
export default function Stocks() {
  useEffect(() => {
    console.log(process.env);
    fetch(
      `https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?chartLast=1&token=${process.env.REACT_APP_IEX_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  console.log(process.env.REACT_APP_IEX_API_KEY);
  return <div>hello</div>;
}
