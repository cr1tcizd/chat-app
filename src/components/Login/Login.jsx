import "./login.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const { auth, db } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL,
    });

    const chats = await getDoc(doc(db, "userchats", auth.currentUser.uid));
    if (!chats.data())
      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
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
