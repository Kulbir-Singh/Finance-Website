import React, { useState, useEffect } from "react";

export default function News() {
  const [articles, setArticles] = useState();
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=38801c44ca8e410290a82a2529881168"
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  }, []);
  console.log(articles);

  return <div>{}</div>;
}
