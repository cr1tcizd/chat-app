import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";
import { setActiveChats } from "../../store/features/chat/chatSlice";

export const Navbar = () => {
  const { currentMember } = useSelector((state) => state.chat);
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
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
    <div className="navbar">
      {width < 768 && (
        <assets.leftArrowSvg
          className="navbar__backArrow"
          onClick={() => {
            dispatch(setActiveChats(true));
          }}
        />
      )}
      <img
        className="navbar__img"
        src={currentMember.user.photoUrl}
        alt="ava"
      />
      <div className="navbar__content">
        <div className="navbar__content__name">
          {currentMember.user.displayName}
        </div>
        <div className="navbar__content__status">
          {/* <span className="navbar__content__status-ind">?</span>
          <p className="navbar__content__status-txt">Online</p> */}
        </div>
      </div>
      <assets.dotsSvg className="navbar__dots" />
    </div>
  );
};
