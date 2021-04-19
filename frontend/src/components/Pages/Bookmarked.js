import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function Bookmarked() {
  const [bookmarks, setBookmarks] = useState(undefined);
  const user = useSelector((state) => state.userInfo);
  const [userBookmarks, setUserBookmarks] = useState(undefined);
  useEffect(() => {
    const ac = new AbortController();
    fetch("/bookmarked")
      .then((res) => res.json())
      .then((data) => setBookmarks(data.data));
    return () => ac.abort();
  }, []);
  const [uid, setUid] = useState(undefined);
  useEffect(() => {
    console.log("inside", bookmarks);
    if (user) {
      setUid(user.USERINFO.uid);
      console.log(user);
    }
  }, [user]);
  // console.log(user);
  // console.log(uid);
  // console.log(bookmarks);

  useEffect(() => {
    if (uid && bookmarks && bookmarks.length > 0) {
      setUserBookmarks(bookmarks.filter((i) => i.uid === uid));
    }
  }, [uid, bookmarks]);

  return (
    <Wrapper>
      {!!userBookmarks &&
        userBookmarks[0] &&
        userBookmarks[0].bookmarks.map((bookmark) => {
          return (
            <div>
              <p>{bookmark.title}</p>
              <p>{bookmark.url}</p>
              <Img src={bookmark.image} />
            </div>
          );
        })}
    </Wrapper>
  );
}
const Img = styled.img`
  height: 200px;
  width: 400px;
`;
const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
`;
