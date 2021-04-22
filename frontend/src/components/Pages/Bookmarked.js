import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import SharedPost from "./SharedPost";

export default function Bookmarked() {
  const [bookmarks, setBookmarks] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const user = useSelector((state) => state.userInfo);
  const [userBookmarks, setUserBookmarks] = useState(undefined);
  const [uid, setUid] = useState(undefined);
  const { currentUser } = useAuth();
  useEffect(() => {
    const ac = new AbortController();
    fetch("/bookmarked")
      .then((res) => res.json())
      .then((data) => setBookmarks(data.data));
    return () => ac.abort();
  }, []);

  useEffect(() => {
    if (user) {
      setUid(user.USERINFO.uid);
      console.log(user);
    }
  }, [user]);
  const ShareArticle = async (article) => {
    console.log(article);
    if (user.USERINFO && article) {
      const ArticleInfo = {
        from: user.USERINFO.uid,
        user: user.USERINFO,
        to: "",
        isread: false,
        url: article.url,
        photo: article.urlToImage,
        content: article.title,
        message: "",
      };
      setModal(true);
      setModalContent(ArticleInfo);
    }
  };
  useEffect(() => {
    if (uid && bookmarks && bookmarks.length > 0) {
      setUserBookmarks(bookmarks.filter((i) => i.uid === uid));
    }
  }, [uid, bookmarks]);
  console.log(bookmarks);
  return (
    <Wrapper>
      <SharedPost
        setModal={setModal}
        modal={modal}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      {!!userBookmarks &&
        userBookmarks[0] &&
        userBookmarks[0].bookmarks.map((bookmark) => {
          return (
            <Container>
              <a href={bookmark.url}>
                <Img src={bookmark.image} />
              </a>
              <div>
                <Title href={bookmark.url}>{bookmark.title}</Title>
              </div>
              {currentUser && (
                <Shared onClick={() => ShareArticle(bookmark)}>share</Shared>
              )}
            </Container>
          );
        })}
    </Wrapper>
  );
}
const Shared = styled.button``;
const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-image: linear-gradient(
    to left top,
    #d1e3ff,
    #e0e9ff,
    #edf0ff,
    #f7f7ff,
    #ffffff
  );
`;

const Img = styled.img`
  width: 400px;
  height: 100%;
  padding: 15px;
  border-radius: 30px;
  transition-duration: 2s;
  :hover {
    transform: scale(1.05);
  }
`;

const Title = styled.a`
  color: black;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 30px;
  height: 95%;
  grid-row-gap: 30px;
`;
