import "./messenger.scss";
import { Chats } from "../Chats/Chats";
import { MessagePanel } from "../MessagePanel/MessagePanel";

export const Messenger = () => {
  return (
    <div className="messenger">
      <Chats />
      <MessagePanel />
    </div>
  );
};
