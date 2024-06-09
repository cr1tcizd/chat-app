import { useContext } from "react";
import "./message.scss";
import { Context } from "../../main";
import { useAuthState } from "react-firebase-hooks/auth";

export const Message = ({ message }) => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <div
      style={
        user.uid === message.uid
          ? { marginLeft: "auto" }
          : { marginRight: "auto", flexDirection: "row-reverse" }
      }
      className="message"
    >
      <div
        style={user.uid === message.uid ? {} : { background: "#E4E3E3" }}
        className="message__text"
      >
        {message.text}
      </div>
      <img className="message__avatar" src={message.photoUrl} alt="avatar" />
    </div>
  );
};
