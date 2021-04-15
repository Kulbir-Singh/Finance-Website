export const requestUserInfo = () => ({
  type: "REQUEST_USERINFO_INFO",
});

export const receiveUserInfo = (userInfo) => ({
  type: "RECEIVE_USERINFO_INFO",
  userInfo,
});

export const receiveUserInfoError = () => ({
  type: "RECEIVE_USERINFO_INFO_ERROR",
});

export const requestBookmarks = () => ({
  type: "REQUEST_BOOKMARKS",
});

export const receiveBookmarks = (bookmarks) => ({
  type: "RECEIVE_BOOKMARKS",
  bookmarks,
});

export const receiveBookmarksError = () => ({
  type: "RECEIVE_BOOKMARKS_ERROR",
});
