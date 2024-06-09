import "./messagePanel.scss";
import { Navbar } from "../Navbar/Navbar";
import { MessageList } from "../MessageList/MessageList";

export const MessagePanel = () => {
  return (
    <div className="messagePanel">
      <Navbar />
      <MessageList />
    </div>
  );
};
