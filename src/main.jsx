import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({});

export const Context = createContext(null);

const auth = getAuth(app);
const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider
        value={{
          firebase,
          auth,
          db,
        }}
      >
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
