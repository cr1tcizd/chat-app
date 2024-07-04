import "./messageBox.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import upload from "../../lib/upload";
import { Loader } from "../Loader/Loader";

export const MessageBox = () => {
  const { auth, db, user } = useSelector((state) => state.auth);
  const { currentMember } = useSelector((state) => state.chat);
  const [value, setValue] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [imgLoad, setImgLoad] = useState(false);

  const handleImg = async (e) => {
    if (e.target.files[0]) {
      setImgLoad(true);
      let imgUrl = await upload(e.target.files[0]);
      setImg({
        file: e.target.files[0],
        url: imgUrl,
      });
      setImgLoad(false);
    }
  };

  const sendMessage = async (e) => {
    if (
      (e.key === "Enter" && value.replace(/\s+/g, "")) ||
      (e.type === "click" && value.replace(/\s+/g, "")) ||
      (img.file && e.key === "Enter") ||
      (img.file && e.type === "click")
    ) {
      let imgUrl = null;

      try {
        imgUrl = img.url;

        await updateDoc(doc(db, "chats", currentMember.chatId), {
          message: arrayUnion({
            id: uuidv4(),
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            text: value,
            createdAt: `${new Date().getHours()}:${
              new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes()
            }`,
            ...(imgUrl && { img: imgUrl }),
          }),
          createdAt: serverTimestamp(),
        });

        const userIDs = [currentMember.user.uid, user.uid];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "userchats", id);
          const userChatsSnap = await getDoc(userChatsRef);
          if (userChatsSnap.exists()) {
            const userChatsData = userChatsSnap.data();
            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === currentMember.chatId
            );

            userChatsData.chats[chatIndex].lastMessage = img.file
              ? "📷изображение"
              : value;
            userChatsData.chats[chatIndex].isSeen =
              id === user.uid ? true : false;
            userChatsData.chats[
              chatIndex
            ].updatedAt = `${new Date().getHours()}:${
              new Date().getMinutes() < 10
                ? "0" + new Date().getMinutes()
                : new Date().getMinutes()
            }`;

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
      setValue("");
      setImg({
        file: null,
        url: "",
      });
    }
  };

  return (
    <div className="messageBox">
      <div className="messageBox__load-container">
        {imgLoad && <p className="messageBox__upload-files">loading...</p>}
        {img.file && !imgLoad && (
          <p className="messageBox__upload-files">{img.file.name}</p>
        )}
      </div>
      <label htmlFor="upload" className="messageBox__clip">
        <assets.clipSvg className="messageBox__clip" />
      </label>
      <input
        type="file"
        id="upload"
        accept="image/png, image/jpeg"
        style={{ display: "none" }}
        onChange={handleImg}
      />
      <input
        className="messageBox__input"
        type="text"
        placeholder="Отправить"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => sendMessage(e)}
      />
      <assets.telegramSvg
        className="messageBox__telegram"
        onClick={(e) => sendMessage(e)}
      />
    </div>
  );
};
