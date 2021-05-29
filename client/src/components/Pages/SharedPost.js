import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

export default function SharedPost({
  setModal,
  modal,
  modalContent,
  setModalContent,
}) {
  const [allFriends, setAllFriends] = useState([]);
  const [shareTo, setShareTo] = useState([]);
  const [sharingPosts, setSharingPosts] = useState([]);
  const commentRef = useRef();
  useEffect(() => {
    if (modalContent) {
      console.log(modalContent);
      let data = modalContent.from;
      let newdata = { data };
      fetch("/friendslist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newdata),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          {
            setAllFriends(data);
          }
        });
    }
  }, [modal]);
  if (shareTo) {
    console.log(allFriends);
  }
  const sharePost = () => {
    if (modalContent && shareTo) {
      const sharedUsersInfo = shareTo.map((friend) => {
        return {
          from: modalContent.from,
          user: modalContent.user,
          to: friend,
          isRead: false,
          url: modalContent.url,
          photo: modalContent.photo,
          content: modalContent.content,
          message: commentRef.current.value,
        };
      });
      console.log("this is shared user info", sharedUsersInfo);
      fetch("/addToSharing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sharedUsersInfo }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };
  return (
    <>
      {modal && modalContent && (
        <Background>
          <Modal>
            <Friends>
              Share To:
              {allFriends.data &&
                allFriends.data.map((friend) => {
                  console.log(friend.uid);
                  return (
                    <FriendButton
                      onClick={() => {
                        if (shareTo.length >= 0) {
                          setShareTo([...shareTo, friend.uid]);
                        } else if (false) {
                          console.log("inside");
                          setShareTo([...shareTo, friend.uid]);
                        }
                        console.log(shareTo);
                      }}
                    >
                      <FriendImg src={friend.photo} />
                      {friend.username}
                    </FriendButton>
                  );
                })}
              <CancelButton
                onClick={() => {
                  setModal(false);
                  setShareTo([]);
                }}
              >
                X
              </CancelButton>
            </Friends>
            <SharedContent>
              <SharedImg src={modalContent.photo} />
              <p>{modalContent.content}</p>
            </SharedContent>
            <UserInput id="comment" ref={commentRef} />
            <Action>
              <button
                onClick={() => {
                  sharePost();
                  if (shareTo.length > 0) {
                    setModal(false);
                  }
                }}
              >
                share
              </button>
              <button>post</button>
            </Action>
          </Modal>
        </Background>
      )}
    </>
  );
}

const Action = styled.div`
  > * {
    margin: 10px;
    margin-left: 0;
  }
`;

const SharedContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const SharedImg = styled.img`
  width: 50%;
  height: 200px;
`;

const UserInput = styled.input`
  width: 100%;
  margin-left: 0;
  text-align: justify;
  height: 25%;
`;

const CancelButton = styled.button`
  margin-left: 73%;
  width: 45px;
  height: 45px;
  font-weight: bold;
  font-size: 25px;
  outline: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

const Friends = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const FriendButton = styled.button`
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  outline: none;
  border: none;
`;
const FriendImg = styled.img`
  width: 35px;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
`;

const Modal = styled.div`
  width: 800px;
  height: 500px;
  padding: 20px;
  border: 2px solid #5c80ff;
  border-radius: 20px;
  background-color: white;
`;
const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
