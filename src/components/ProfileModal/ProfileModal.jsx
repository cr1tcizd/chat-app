import { useDispatch, useSelector } from "react-redux";
import "./profileModal.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { assets } from "../../assets/assets";
import upload from "../../lib/upload";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Loader } from "../Loader/Loader";
import { setCurrentMember } from "../../store/features/chat/chatSlice";

export const ProfileModal = ({ profileModal, setProfileModal }) => {
  const { auth, db, user } = useSelector((state) => state.auth);
  const [authUser] = useAuthState(auth);
  const [onChangeInfo, setOnChangeInfo] = useState(false);
  const [saved, setSaved] = useState("");
  const [avatar, setAvatar] = useState({
    file: null,
    url: user ? user.photoUrl : authUser.photoURL,
  });

  const dispatch = useDispatch();

  const handleAvatar = async (e) => {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
    setOnChangeInfo(true);
  };

  const handleSaveSettings = async () => {
    setSaved("disable");
    const imgUrl = await upload(avatar.file);
    setSaved("");
    updateDoc(doc(db, "users", authUser.uid), {
      photoUrl: imgUrl,
    });
  };

  const handleCloseModal = () => {
    setProfileModal(false);
    setOnChangeInfo(false);
    setAvatar({
      file: null,
      url: user.photoUrl,
    });
  };

  return (
    <div
      className={`${
        profileModal ? "profileModal profileModal-active" : "profileModal"
      }`}
      onClick={handleCloseModal}
    >
      <div
        className={`${
          profileModal
            ? "profileModal__content profileModal__content-active"
            : "profileModal__content"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profileModal__content__row">
          <div className="profileModal__content__avatar">
            <label
              htmlFor="file"
              className="profileModal__content__avatar-label"
            >
              <img
                className="profileModal__content__avatar-user"
                src={avatar.url}
                alt=""
              />
              <assets.uploadSvg className="profileModal__content__avatar-upload" />
            </label>
            <input
              type="file"
              id="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={handleAvatar}
            />
          </div>
          <div className="profileModal__content__info">
            <p className="profileModal__content__info__name">
              {authUser.displayName}
            </p>
            <p className="profileModal__content__info__email">
              {authUser.email}
            </p>
          </div>
          <button
            className="profileModal__content__btn"
            onClick={() => {
              auth.signOut();
              dispatch(setCurrentMember({ contact: null }));
            }}
          >
            Выйти
          </button>
        </div>

        <button
          className="profileModal__content__btn-save"
          onClick={handleSaveSettings}
          style={{ display: onChangeInfo ? "block" : "none" }}
          disabled={saved}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
