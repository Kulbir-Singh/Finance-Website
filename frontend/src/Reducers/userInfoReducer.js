const initialState = {
  userInfo: null,
  bookmarks: null,
  status: "idle",
};

export default function userInfoReducer(state = initialState, action) {
  // console.log("HELLO", action);
  switch (action.type) {
    case "REQUEST_USERINFO_INFO": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVE_USERINFO_INFO": {
      return {
        ...state,
        status: "idle",
        USERINFO: action.userInfo,
      };
    }
    case "RECEIVE_USERINFO_INFO_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    case "REQUEST_BOOKMARKS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_BOOKMARKS": {
      return {
        ...state,
        status: "idle",
        BOOKMARKS: action.bookmarks,
      };
    }
    case "RECEIVE_BOOKMARKS_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}

export const getUserInformation = (state) => state.USERINFO;
