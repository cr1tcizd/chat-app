import "./navbar.scss";
import catImg from "./../../assets/cat.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <img className="navbar__img" src={catImg} alt="" />
      <div className="navbar__content">
        <div className="navbar__content__name">Florencio Dorrance</div>
        <div className="navbar__content__status">
          <span className="navbar__content__status-ind">status</span>
          <p className="navbar__content__status-txt">Online</p>
        </div>
      </div>
    </div>
  );
};
