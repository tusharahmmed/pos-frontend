import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  category_id: "",
  brand_id: "",
  search: "",
};

export const storeSlice = createSlice({
  name: "store",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category_id = action.payload;
    },
    setBrand: (state, action) => {
      state.brand_id = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.search = action.payload;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {setBrand, setCategory, setSearchTerm} = storeSlice.actions;

const storeReducer = storeSlice.reducer;
export default storeReducer;
