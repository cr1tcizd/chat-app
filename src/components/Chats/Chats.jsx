import { useContext } from "react";
import "./chats.scss";
import { collection, getDocs } from "firebase/firestore";
import { Context } from "../../main";
import { Contact } from "../Contact/Contact";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../Loader/Loader";

export const Chats = () => {
  const { db, auth } = useContext(Context);
  const [users, loading] = useCollectionData(collection(db, "users"));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="chats">
      <input className="chats__search" type="search" placeholder="Поиск" />
      {users
        .filter((user) => user.uid !== auth.lastNotifiedUid)
        .map((contact) => (
          <Contact key={contact.uid} contact={contact} />
        ))}
    </div>
  );
};
