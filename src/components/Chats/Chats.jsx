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
import { assets } from "../../assets/assets";
import { SearchModal } from "../SearchModal/SearchModal";
import { BurgerNav } from "../BurgerNav/BurgerNav";

export const Chats = () => {
  const { db, auth } = useSelector((state) => state.auth);
  const { currentMember, chatsActive } = useSelector((state) => state.chat);
  const [users, loading] = useCollectionData(collection(db, "users"));
  const [chats, setChats] = useState([]);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", auth.currentUser.uid),
      async (res) => {
        const items = res.data().chats;
        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverid);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promisses);
        setChats(chatData);
      }
    );

    return () => {
      unSub();
    };
  }, [auth.currentUser.uid]);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setActiveSearch(true);

    setSearchUsers(
      chats.filter((chat) =>
        chat.user.displayName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSearchNewUser = () => {
    setSearch(true);
  };

  const handleBurger = () => {
    setBurgerMenu(true);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      className="chats"
      // style={{
      //   visibility:
      //     chatsActive && width <= 768
      //       ? "visible"
      //       : width >= 768
      //       ? "visible"
      //       : "hidden",
      // }}
      style={
        chatsActive && width <= 768
          ? { visibility: "visible", transform: "translateX(0)", opacity: "1" }
          : width >= 768
          ? { visibility: "visible" }
          : {
              visibility: "hidden",
              transform: "translateX(-100%)",
              opacity: "0",
            }
      }
    >
      <SearchModal search={search} setSearch={setSearch} chats={chats} />
      <BurgerNav burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />

      <div className="chats__add-user">
        <assets.burgerSvg
          className="chats__add-user__burger"
          onClick={handleBurger}
        />
        <h2 className="chats__add-user__title">Чат</h2>
        <assets.newUserSvg
          className={
            search
              ? "chats__add-user__svg chats__add-user__svg-active"
              : "chats__add-user__svg"
          }
          onClick={handleSearchNewUser}
        />
      </div>
      <div className="chats__search">
        <input
          className="chats__search-input"
          type="text"
          placeholder="Поиск"
          value={value}
          onChange={handleSearch}
        />
        {activeSearch && (
          <assets.closeSvg
            className="chats__search-delete"
            onClick={() => {
              setActiveSearch(false);
              setValue("");
            }}
          />
        )}
      </div>
      <div className="chats__contact-row">
        {(activeSearch ? searchUsers : chats)
          .filter((user) => user.uid !== auth.currentUser.uid)
          .map((contact) => (
            <Contact
              key={contact.user.uid}
              contact={contact}
              setSearch={setSearch}
            />
          ))}
      </div>
    </div>
  );
};
