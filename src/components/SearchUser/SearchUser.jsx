import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import "./searchUser.scss";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";

export const SearchUser = ({ user }) => {
  const { db, auth } = useSelector((state) => state.auth);

  const handleAddNewUser = async () => {
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
          receiverid: user.uid,
          updatedAt: "",
          isSeen: true,
        }),
      });

      await updateDoc(doc(userChatsRef, user.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverid: auth.currentUser.uid,
          updatedAt: "",
          isSeen: true,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="searchUser">
      <img className="searchUser__photo" src={user.photoUrl} alt="" />
      <p className="searchUser__name">{user.displayName}</p>
      <assets.addFriendSvg
        className="searchUser__btn"
        onClick={handleAddNewUser}
      />
      {/* <button className="searchUser__btn" onClick={handleAddNewUser}>
        Добавить
      </button> */}
    </div>
  );
};
