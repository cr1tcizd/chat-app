import "./chats.scss";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Contact } from "../Contact/Contact";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../Loader/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Chats = () => {
  const { db, auth } = useSelector((state) => state.auth);
  const [users, loading] = useCollectionData(collection(db, "users"));
  const [chats, setChats] = useState([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const userId = auth.lastNotifiedUid;

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", auth.currentUser.uid),
      async (res) => {
        const items = res.data().chats;
        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.id);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promisses);
        setChats(chatData);
        console.log(chatData);
      }
    );

    return () => {
      unSub();
    };
  }, [auth.currentUser.uid]);

  console.log(chats);

  const handleSearch = async (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setSearch(true);

    const q = query(
      collection(db, "users"),
      // where("uid", "!=", auth.currentUser.uid),
      where("displayName", "==", e.target.value)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (e.target.value.includes(doc.data().displayName)) {
        setSearchUsers([{ user: doc.data() }]);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }
  console.log(chats);
  return (
    <div className="chats">
      <input
        className="chats__search"
        type="search"
        placeholder="Поиск"
        value={value}
        onChange={handleSearch}
      />
      {(search ? searchUsers : chats)
        .filter((user) => user.uid !== auth.currentUser.uid)
        .map((contact) => (
          <Contact
            key={contact.user.uid}
            contact={contact}
            setSearch={setSearch}
          />
        ))}
    </div>
  );
};
