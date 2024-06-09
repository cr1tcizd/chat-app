import { Navigate, Route, Router, Routes, redirect } from "react-router-dom";
import { Login } from "../Login/Login";
import { Messenger } from "../Messenger/Messenger";
import { useContext } from "react";
import { Context } from "../../main";
import { useAuthState } from "react-firebase-hooks/auth";

export const AppRouter = () => {
  const { auth } = useContext(Context);
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
