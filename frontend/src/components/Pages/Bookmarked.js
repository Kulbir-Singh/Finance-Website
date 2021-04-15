import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Bookmarked() {
  const [bookmarks, setBookmarks] = useState();
  const user = useSelector((state) => state.userInfo);
  useEffect(() => {
    const ac = new AbortController();
    fetch("/bookmarked")
      .then((res) => res.json())
      .then((data) => setBookmarks(data.data));
    return () => ac.abort();
  }, [user]);

  const uid = user && user.USERINFO.uid;
  console.log(uid);
  console.log(bookmarks);
  let userBookmarks =
    uid && bookmarks && bookmarks.filter((i) => i.uid === uid);
  console.log(userBookmarks);
  return (
    <div>
      {userBookmarks &&
        userBookmarks[0].bookmarks.map((bookmark) => {
          return (
            <div>
              <p>{bookmark.title}</p>
              <p>{bookmark.url}</p>
              <img src={bookmark.image} />
            </div>
          );
        })}
    </div>
  );
}
