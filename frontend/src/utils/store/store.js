import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AuthSlice from "./AuthSlice";
import CartSlice from "./CartSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthSlice);
const persistedReducer2 = persistReducer(persistConfig, CartSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart:persistedReducer2
  }
});

const persistor = persistStore(store);

export { store, persistor };
