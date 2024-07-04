import "./contact.scss";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  setActiveChats,
  setCurrentMember,
} from "../../store/features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Contact = ({ contact, setSearch }) => {
  const dispatch = useDispatch();
  const { auth, db } = useSelector((state) => state.auth);
  const { currentMember } = useSelector((state) => state.chat);
  let backgroundStyles = { background: "none" };

  if (currentMember) {
    if (contact.user.uid === currentMember.user.uid) {
      backgroundStyles = { background: "rgba(97, 94, 240, 0.1)" };
    }
  }

  useEffect(() => {
    if (contact && currentMember) {
      if (contact.user.uid === currentMember.user.uid) {
        const setContactData = async () => {
          const userChatsRef = doc(db, "userchats", auth.currentUser.uid);
          const userChatsSnap = await getDoc(userChatsRef);
          if (userChatsSnap.exists()) {
            const userChatsData = userChatsSnap.data();
            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === contact.chatId
            );
            userChatsData.chats[chatIndex].isSeen = true;
            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        };
        return () => {
          setContactData();
        };
      }
    }
  }, [contact]);

  const setMember = async () => {
    const userChatsRef = doc(db, "userchats", auth.currentUser.uid);
    const userChatsSnap = await getDoc(userChatsRef);
    if (userChatsSnap.exists()) {
      const userChatsData = userChatsSnap.data();
      const chatIndex = userChatsData.chats.findIndex(
        (c) => c.chatId === contact.chatId
      );
      userChatsData.chats[chatIndex].isSeen = true;
      await updateDoc(userChatsRef, {
        chats: userChatsData.chats,
      });
    }

    dispatch(setCurrentMember({ contact }));
    dispatch(setActiveChats(false));
  };
  return (
    <div className="contact" style={backgroundStyles} onClick={setMember}>
      <img className="contact__img" src={contact.user.photoUrl} alt="" />

      <div className="contact__content">
        <div className="contact__content__head">
          <div className="contact__content__head__name">
            {contact.user.displayName}
          </div>
          <p className="contact__content__head__time">{contact.updatedAt}</p>
        </div>
        <div className="contact__content__body">
          <div className="contact__content__body__message">
            {contact.lastMessage.length > 12
              ? contact.lastMessage.slice(0, 12) + "..."
              : contact.lastMessage}
          </div>
          <span
            className="contact__content__body__status"
            style={{ display: contact.isSeen ? "none" : "block" }}
          ></span>
        </div>
      </div>
    </div>
  );
};
