import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "../AppRouter/AppRouter";
import "./app.scss";
import { useContext } from "react";
import { Context } from "../../main";
import { Loader } from "../Loader/Loader";

function App() {
  const { auth } = useContext(Context);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
