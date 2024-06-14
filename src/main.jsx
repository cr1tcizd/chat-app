import React, { createContext, useState } from "react";
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
import { Provider } from "react-redux";
import { store } from "./store/store";

// const app = initializeApp({
//   apiKey: "AIzaSyA9bJ-ZubyV_tri_XYOlRJsMkojq8e5uZw",
//   authDomain: "chat-react-8fcd0.firebaseapp.com",
//   projectId: "chat-react-8fcd0",
//   storageBucket: "chat-react-8fcd0.appspot.com",
//   messagingSenderId: "461160389072",
//   appId: "1:461160389072:web:ff0b0db65076a6185bc1d5",
//   measurementId: "G-TJDBSJFMCW",
// });

// export const Context = createContext(null);

// const auth = getAuth(app);
// const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
