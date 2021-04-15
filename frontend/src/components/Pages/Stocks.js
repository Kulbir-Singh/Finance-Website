import React, { useEffect } from "react";
// ask how to use procces.env
export default function Stocks() {
  useEffect(() => {
    const ac = new AbortController();
    fetch(
      `https://cloud.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=10m&last=1000&token=${process.env.REACT_APP_IEX_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    return () => ac.abort();
  }, []);
  return <div>hello</div>;
}
