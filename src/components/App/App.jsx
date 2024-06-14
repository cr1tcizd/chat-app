import "./app.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppRouter } from "../AppRouter/AppRouter";
import { Loader } from "../Loader/Loader";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => state.auth);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
