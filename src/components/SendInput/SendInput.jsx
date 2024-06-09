import { useContext, useState } from "react";
import "./sendInput.scss";
import { Context } from "../../main";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const SendInput = () => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");

  const sendMessage = async (e) => {
    if (e.key === "Enter" && value.replace(/\s+/g, "")) {
      try {
        const docRef = await addDoc(collection(db, "messages"), {
          id: uuid(),
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
