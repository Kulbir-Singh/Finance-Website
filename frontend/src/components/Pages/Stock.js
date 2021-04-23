import ChartInfo from "./Chart";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    backgroundColor: "#191454",
  },
}));

export default function Stock() {
  const classes = useStyles();
  let { stockId, stockName } = useParams();
  const [stockNews, setStockNews] = useState();
  const [stockBio, setStockBio] = useState();
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

  useEffect(() => {
    fetch(
      "https://api.twelvedata.com/quote?symbol=AAPL&apikey=e5a7b2641f4142d1a63c0a5768208a12"
    )
      .then((res) => res.json())
      .then((data) => setStockBio(data));
  }, []);
  console.log(stockNews);

  return (
    <Wrapper>
      <StockChart>
        <ChartInfo
          stockWidth={100}
          stockHeight={100}
          stockId={stockId}
          stock={stock}
          setStock={setStock}
        />
      </StockChart>
      <StockInfo>
        {stockBio && (
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Average Volume</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{stockBio.average_volume}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Exchange </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{stockBio.exchange}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Name </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{stockBio.name}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Symbol </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{stockBio.symbol}</Paper>
            </Grid>{" "}
            <Grid item xs={6}>
              <Paper className={classes.paper}> Open </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {Math.round(parseFloat(stockBio.open) * 100) / 100}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>Close</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {Math.round(parseFloat(stockBio.close) * 100) / 100}
              </Paper>
            </Grid>
          </Grid>
        )}
        <NewsSection>
          {stockNews?.articles?.map((article) => {
            return (
              <Article>
                <News
                  onClick={() => {
                    window.open(article.url);
                  }}
                >
                  {article.title}
                </News>
              </Article>
            );
          })}
        </NewsSection>
      </StockInfo>
    </Wrapper>
  );
}

const StockInfo = styled.div``;

const News = styled.a`
  color: black;
  transition-duration: 2s;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StockChart = styled.div`
  height: 550px;
  width: 900px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: auto;
  margin-left: 5%;
`;

const Article = styled.div`
  margin: 10px 0;
`;

const NewsSection = styled.div``;
