import { useSelector } from "react-redux";
import "./burgerNav.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { assets } from "../../assets/assets";
import useOutsideClick from "../../hooks/useOutsideClick";
import { ProfileModal } from "../ProfileModal/ProfileModal";
import { useState } from "react";

export const BurgerNav = ({ burgerMenu, setBurgerMenu }) => {
  const { auth, user } = useSelector((state) => state.auth);
  const [authUser] = useAuthState(auth);
  const [profileModal, setProfileModal] = useState(false);

  const outsideClickRef = useOutsideClick(() => setBurgerMenu(false));

  const handleProfile = () => {
    setProfileModal(true);
    setBurgerMenu(false);
  };

  return (
    <>
      <ProfileModal
        profileModal={profileModal}
        setProfileModal={setProfileModal}
      />
      <div
        className={`${burgerMenu ? "burgerNav burgerNav-active" : "burgerNav"}`}
        ref={outsideClickRef}
      >
        <img
          className="burgerNav__avatar "
          src={user ? user.photoUrl : authUser.photoURL}
          alt="Profile"
          onClick={handleProfile}
        />
        <assets.settingSvg className="burgerNav__setting" />
      </div>
    </>
  );
};
