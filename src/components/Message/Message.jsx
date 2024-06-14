import "./message.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export const Message = ({ message }) => {
  const { auth } = useSelector((state) => state.auth);
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
