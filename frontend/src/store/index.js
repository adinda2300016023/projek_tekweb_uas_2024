import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/CategorySlice.js";
import productReducer from "../features/ProductSlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
});