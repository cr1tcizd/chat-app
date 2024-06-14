import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { setCurrentMember } from "../../store/features/chat/chatSlice";
import "./contact.scss";
import { useDispatch, useSelector } from "react-redux";

export const Contact = ({ contact, setSearch }) => {
  console.log(contact);
  const { db, auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { currentMember } = useSelector((state) => state.chat);

  const setMember = async () => {
    dispatch(setCurrentMember({ contact }));
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });

      await updateDoc(doc(userChatsRef, auth.currentUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverid: contact.uid,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentMember.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverid: auth.currentUser.uid,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.error(err);
    }
    setSearch(false);
  };

  return (
    <div className="contact" onClick={setMember}>
      <img className="contact__img" src={contact.user.photoUrl} alt="" />

      <div className="contact__content">
        <div className="contact__content__head">
          <div className="contact__content__head__name">
            {contact.user.displayName}
          </div>
          <p className="contact__content__head__time"></p>
        </div>
        <div className="contact__content__message">{contact.lastMessage}</div>
      </div>
    </div>
  );
};
