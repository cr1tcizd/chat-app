import "./messenger.scss";
import { Chats } from "../Chats/Chats";
import { MessagePanel } from "../MessagePanel/MessagePanel";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { useEffect, useState } from "react";
import { MessageImgModal } from "../MessageImgModal/MessageImgModal";

export const Messenger = () => {
  const { currentMember } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!user) {
    <Loader />;
  }
  return (
    <div className="messenger">
      <MessageImgModal />
      <Chats />
      {currentMember ? (
        <MessagePanel />
      ) : (
        width >= 768 && (
          <div className="messenger__choice">
            <p className="messenger__choice-txt">Выберите чат</p>
          </div>
        )
      )}
    </div>
  );
};
