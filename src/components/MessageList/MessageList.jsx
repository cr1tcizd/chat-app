import "./messageList.scss";
import { SendInput } from "../SendInput/SendInput";
import { Message } from "../Message/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { Loader } from "../Loader/Loader";
import { useSelector } from "react-redux";

export const MessageList = () => {
  const { db } = useSelector((state) => state.auth);
  const q = query(collection(db, "messages"), orderBy("createdAt"));
  const [messages, loading] = useCollectionData(q);
  const messageContainer = useRef(null);
  useEffect(() => {
    if (messageContainer.current !== null) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="messageList">
      <div ref={messageContainer} className="messageList__container">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <SendInput />
    </div>
  );
};
