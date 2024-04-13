import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AuthSlice from "./AuthSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  }
});

const persistor = persistStore(store);

export { store, persistor };
