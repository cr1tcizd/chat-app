import "./sendInput.scss";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

export const SendInput = () => {
  const { auth, db } = useSelector((state) => state.auth);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");

  const sendMessage = async (e) => {
    if (e.key === "Enter" && value.replace(/\s+/g, "")) {
      try {
        await addDoc(collection(db, "messages"), {
          id: uuidv4(),
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
