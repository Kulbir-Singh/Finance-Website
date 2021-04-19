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
      shareTo.map((friend) => {
        let shareInfo = {
          from: modalContent.from,
          user: modalContent.user,
          to: friend,
          isRead: false,
          url: modalContent.url,
          photo: modalContent.photo,
          content: modalContent.content,
          message: commentRef.current.value,
        };
        return fetch("/addToSharing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shareInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            shareInfo = {};
          });
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
                    <button
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
                      {friend.username}
                      {/* <Img src={friend.photo} /> */}
                    </button>
                  );
                })}
            </Friends>
            <input id="comment" ref={commentRef} />
            <div>
              <button
                onClick={() => {
                  sharePost();
                }}
              >
                share
              </button>
              <button>post</button>
            </div>
            <p>{modalContent.url}</p>
            <button
              onClick={() => {
                setModal(false);
                setShareTo([]);
              }}
            >
              X
            </button>
          </Modal>
        </Background>
      )}
    </>
  );
}

const Friends = styled.div`
  width: 100%;
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
`;

const Modal = styled.div`
  width: 800px;
  height: 500px;
  border: 2px solid red;
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
