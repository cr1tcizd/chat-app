import { useState } from "react";
import "./searchModal.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { SearchUser } from "../SearchUser/SearchUser";

export const SearchModal = ({ search, setSearch, chats }) => {
  const { db, auth } = useSelector((state) => state.auth);
  const [value, setValue] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [activeSearchUsers, setActiveSearchUsers] = useState(false);

  const handleSearchNewUser = async () => {
    if (value) {
      setActiveSearchUsers(true);
      setSearchUsers([]);
      const q = query(
        collection(db, "users"),
        where(
          "uid",
          "not-in",
          chats.length === 0 ? [""] : chats.map((chat) => chat.user.uid)
        ),
        where("displayName", "==", value)
      );

      const querySnapshot = await getDocs(q);
      const searchUsersArr = [];
      querySnapshot.forEach((doc) => {
        searchUsersArr.push(doc.data());
        setSearchUsers(searchUsersArr);
      });
    }
  };

  const closeSearchModal = () => {
    setSearch(false);
    setValue("");
    setSearchUsers([]);
    setActiveSearchUsers(false);
  };
  return (
    <div
      className={search ? "searchModal searchModal-active" : "searchModal"}
      onClick={closeSearchModal}
    >
      <div
        className={
          search
            ? "searchModal__row searchModal__row-active"
            : "searchModal__row"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="searchModal__row__title">Добавить пользователя</h2>
        <div className="searchModal__row__search">
          <input
            className="searchModal__row__search-inp"
            type="text"
            placeholder="Поиск.."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="searchModal__row__search-btn"
            onClick={handleSearchNewUser}
          >
            Найти
          </button>
        </div>
        {activeSearchUsers && (
          <>
            <strong className="searchModal__row__subtitle">
              Результаты поиска:
            </strong>
            {searchUsers.length === 0 && (
              <p className="searchModal__row__searchResult">
                Ничего не найдено
              </p>
            )}
          </>
        )}
        <div className="searchModal__row__users">
          {searchUsers
            .filter((user) => user.uid !== auth.currentUser.uid)
            .map((user) => (
              <SearchUser key={user.uid} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};
