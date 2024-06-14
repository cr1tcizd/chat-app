import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Messenger } from "../Messenger/Messenger";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const { auth } = useSelector((state) => state.auth);
  const [user] = useAuthState(auth);

  return (
    <>
      <button onClick={() => auth.signOut()}>выйти</button>
      <Routes>
        <Route path="*" element={<Navigate to="/messenger" replace />} />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/messenger"} /> : <Login />}
        />
      </Routes>
    </>
  );
};
