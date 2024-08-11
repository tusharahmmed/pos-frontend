import {cartSubtotaltKey, productsKey} from "@/constants/storageKey";
import {ICartProduct, IProduct} from "@/types";
import {getFromLocalStorage, setToLocalStorage} from "@/utils/local-storage";
import {createSlice} from "@reduxjs/toolkit";

const initialState: {
  products: any;
  sub_total: number;
} = {
  products: getFromLocalStorage(productsKey)
    ? JSON.parse(getFromLocalStorage(productsKey) as string)
    : [],
  sub_total: getFromLocalStorage(cartSubtotaltKey)
    ? JSON.parse(getFromLocalStorage(cartSubtotaltKey) as string)
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // if exist then inc quantity
      if (
        state.products.find((item: IProduct) => item.id === action.payload.id)
      ) {
        let index: number = state.products.findIndex(
          (item: IProduct) => item.id == action.payload.id
        );

        let existProduct: any = state.products[index];
        state.products[index] = {
          ...existProduct,
          count: existProduct.count + 1,
        };
      } else {
        // if not exist then add
        state.products.push({...action.payload, count: 1});
      }
      // calculate sub_total persistent

      let subTotal = state.products.reduce(
        (total: number, currentItem: ICartProduct): number => {
          return total + currentItem.count * parseFloat(currentItem.price);
        },
        0
      );
      state.sub_total = subTotal;
      setToLocalStorage(cartSubtotaltKey, JSON.stringify(state.sub_total));

      setToLocalStorage(productsKey, JSON.stringify(state.products));
    },
    decreaseCartQuantity: (state, action) => {
      let index = state.products.findIndex(
        (item: ICartProduct) => item.id === action.payload.id
      );

      if (state.products[index].count > 1) {
        state.products[index].count -= 1;
      } else if (state.products[index].count === 1) {
        state.products = state.products.filter(
          (item: IProduct) => item.id !== action.payload.id
        );
      }
      // calculate sub_total persistent

      let subTotal = state.products.reduce(
        (total: number, currentItem: ICartProduct): number => {
          return total + currentItem.count * parseFloat(currentItem.price);
        },
        0
      );
      state.sub_total = subTotal;
      setToLocalStorage(cartSubtotaltKey, JSON.stringify(state.sub_total));

      setToLocalStorage(productsKey, JSON.stringify(state.products));
    },
    resetCart: (state) => {
      state.products = [];
      state.sub_total = 0;
      setToLocalStorage(cartSubtotaltKey, JSON.stringify(state.sub_total));

      setToLocalStorage(productsKey, JSON.stringify(state.products));
    },
  },
});

export const {addToCart, decreaseCartQuantity, resetCart} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
