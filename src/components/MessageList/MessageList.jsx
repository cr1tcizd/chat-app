import "./messageList.scss";
import { MessageBox } from "../MessageBox/MessageBox";
import { Message } from "../Message/Message";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";

export const MessageList = () => {
  const { db, auth } = useSelector((state) => state.auth);
  const { currentMember } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([]);
  const messageContainer = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", currentMember.chatId), (doc) => {
      setMessages(doc.data().message);
    });
    return () => {
      unSub();
    };
  }, [currentMember.user.uid]);

  useEffect(() => {
    if (messageContainer.current !== null) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messageList">
      <div ref={messageContainer} className="messageList__container">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            sameUser={
              messages[index - 1] && messages[index - 1].uid === message.uid
                ? { true: true, prevCreatedAt: messages[index - 1].createdAt }
                : { true: false, prevCreatedAt: message.createdAt }
            }
            // sameUser={messages[index - 1] ? messages[index - 1].uid : false}
          />
        ))}
      </div>
      <MessageBox />
    </div>
  );
};
