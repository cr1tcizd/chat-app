import { useContext, useState } from "react";
import "./sendInput.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../main";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader } from "../Loader/Loader";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export const SendInput = () => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");

  console.log(db);
  const sendMessage = async (e) => {
    if (e.key === "Enter" && value.replace(/\s+/g, "")) {
      try {
        const docRef = await addDoc(collection(db, "messages"), {
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          text: value,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error(e);
      }
      setValue("");
    }
  };

  return (
    <div>
      <input
        className="sendInput"
        type="text"
        placeholder="Отправить"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => sendMessage(e)}
      />
    </div>
  );
};
