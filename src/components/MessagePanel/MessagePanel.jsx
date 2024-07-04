import "./messagePanel.scss";
import { Navbar } from "../Navbar/Navbar";
import { MessageList } from "../MessageList/MessageList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const MessagePanel = () => {
  const { currentMember, chatsActive } = useSelector((state) => state.chat);
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

  return (
    <div
      className="messagePanel"
      style={
        chatsActive && width <= 768
          ? {
              visibility: "hidden",
              transform: "translateX(100%)",
              opacity: "0",
            }
          : width >= 768
          ? { visibility: "visible", transform: "translateX(0)", opacity: "1" }
          : { visibility: "visible" }
      }
    >
      <Navbar />
      <MessageList />
    </div>
  );
};
