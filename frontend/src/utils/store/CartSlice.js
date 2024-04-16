import { createSlice } from "@reduxjs/toolkit";
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
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
    localStorage.setItem("cartState", serializedState);
  } catch {
    // ignore write errors
  }
};
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
    count:0
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex = state.value.findIndex(item => item.id === newItem.id);
      state.count=state.count+1
      if (existingItemIndex !== -1) {
        // If item already exists in the cart, increment its count
        state.value[existingItemIndex].count++;
      } else {
        // If item doesn't exist in the cart, add it with count 1
        state.value.push({ ...newItem, count: 1 });
      }
    },
    removeFromCart:(state,action)=>{
      
      state.value=state.value.filter((item)=>item.id!==action.payload.id)
      state.count= state.count-action.payload.count
    },
    updateCartCount:(state,action)=>{
    
      let obj=state.value.find(obj=>obj.id===action.payload.id)
      obj["count"]=action.payload.count;
      state.count=state.count+(action.payload.count-action.payload.oldCount)
    },
    upDateCount:(state,action)=>{
      state.count-=action.payload
      
    }
  }
});

export const { addToCart, upDateCount,removeFromCart,updateCartCount } = cartSlice.actions;
export default cartSlice.reducer;
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
  