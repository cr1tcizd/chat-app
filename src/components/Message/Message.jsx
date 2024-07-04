import { useState } from "react";
import "./message.scss";
import { useDispatch, useSelector } from "react-redux";
import { MessageImgModal } from "../MessageImgModal/MessageImgModal";
import { setImgModal } from "../../store/features/chat/chatSlice";

export const Message = ({ message, sameUser }) => {
  const { auth, user } = useSelector((state) => state.auth);
  const { currentMember } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleMessageImg = (e) => {
    dispatch(
      setImgModal({
        photo: e.target.getAttribute("src"),
        status: true,
      })
    );
  };

  return (
    <>
      <div
        style={
          user.uid === message.uid
            ? { marginLeft: "auto" }
            : { marginRight: "auto", flexDirection: "row-reverse" }
        }
        className="message"
      >
        <div className="message__text-container">
          {message.img && (
            <img
              className="message__text-container__img"
              src={message.img}
              alt=""
              onClick={(e) => handleMessageImg(e)}
            />
          )}
          {message.text && (
            <div
              style={
                user.uid === message.uid
                  ? { background: "#615ef0", color: "#ffffff" }
                  : { background: "#f1f1f1", color: "#000" }
              }
              className="message__text"
            >
              {message.text}
            </div>
          )}
        </div>

        {sameUser.true &&
        Number(message.createdAt.slice(3)) ===
          Number(sameUser.prevCreatedAt.slice(3)) ? (
          <div className="message__avatar"></div>
        ) : (
          <img
            className="message__avatar"
            src={
              message.uid === user.uid
                ? user.photoUrl
                : currentMember.user.photoUrl
            }
            alt="avatar"
          />
        )}
        <div className="message__timestamp">
          {sameUser.true &&
          Number(message.createdAt.slice(3)) ===
            Number(sameUser.prevCreatedAt.slice(3))
            ? ""
            : message.createdAt}
        </div>
      </div>
    </>
  );
};
