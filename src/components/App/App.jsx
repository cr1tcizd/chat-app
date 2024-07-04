import "./app.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "../AppRouter/AppRouter";
import { Loader } from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setCurrentUser } from "../../store/features/auth/authSlice";

function App() {
  const { auth, db } = useSelector((state) => state.auth);
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      try {
        if (auth.currentUser) {
          const currentUser = await getDoc(doc(db, "users", user.uid));
          dispatch(setCurrentUser({ user: currentUser.data() }));
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unSub();
    };
  }, [auth]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
