import { useContext } from "react";
import "./login.scss";
import { Context } from "../../main";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
  const { auth, db } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", `${user.uid}`), {
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL,
    });
  };

  return (
    <div className="login">
      <button onClick={login} className="login__btn">
        Войти с помощью Google
      </button>
    </div>
  );
};
