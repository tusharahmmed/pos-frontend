import {baseApi} from "./features/api/baseApi";
import cartReducer from "./features/cart/cartSlice";
import storeReducer from "./features/store/storeSlice";

export const reducer = {
  // Add the generated reducer as a specific top-level slice
  [baseApi.reducerPath]: baseApi.reducer,
  store: storeReducer,
  cart: cartReducer,
};
