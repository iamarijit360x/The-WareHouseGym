import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: false,
    userData: {},
    isAdmin:false
    },
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setUserData:(state,action)=>{
      state.userData=action.payload
    },
    setAdmin:(state,action)=>{
      state.isAdmin=action.payload
    }

  },
});

export const { setAuthState,setUserData,setAdmin } = authSlice.actions;

export default authSlice.reducer;

// Function to persist the entire Redux store
export const persistStore = (store) => {
  store.subscribe(() => {
    saveState(store.getState());
  });
};

// Function to load the entire Redux store from local storage
export const loadStore = () => {
  return loadState();
};
