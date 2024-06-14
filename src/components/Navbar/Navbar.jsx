import "./navbar.scss";
import catImg from "./../../assets/cat.png";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { currentMember } = useSelector((state) => state.chat);
  console.log(currentMember);

  return (
    <div className="navbar">
      <img
        className="navbar__img"
        src={currentMember.photoUrl}
        alt="Аватарка"
      />
      <div className="navbar__content">
        <div className="navbar__content__name">{currentMember.displayName}</div>
        <div className="navbar__content__status">
          <span className="navbar__content__status-ind">?</span>
          <p className="navbar__content__status-txt">Online</p>
        </div>
      </div>
    </div>
  );
};
