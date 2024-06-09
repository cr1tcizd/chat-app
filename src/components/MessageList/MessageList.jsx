import "./messageList.scss";
import { SendInput } from "../SendInput/SendInput";
import { Message } from "../Message/Message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../../main";
import { Loader } from "../Loader/Loader";

export const MessageList = () => {
  const { db } = useContext(Context);
  const q = query(collection(db, "messages"), orderBy("createdAt"));
  const [messages, loading] = useCollectionData(q);
  const messageContainer = useRef(null);
  useEffect(() => {
    console.log(messageContainer.current);
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
          <Message message={message} />
        ))}
      </div>
      <SendInput />
    </div>
  );
};
