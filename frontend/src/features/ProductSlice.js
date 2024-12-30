import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const response = await axios.get("http://localhost:5500/products");
    return response.data;
  }
);

export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (categoryId) => {
    const response = await axios.get(`http://localhost:5500/products?category_id=${categoryId}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.error = "Gagal mengambil data produk";
        state.loading = false;
        state.data = [];
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        state.error = "Gagal mengambil data produk berdasarkan kategori";
        state.loading = false;
        state.data = [];
      });
  }
});

export const selectProductData = (state) => state.product.data;
export const selectProductLoading = (state) => state.product.loading;
export const selectProductError = (state) => state.product.error;

export default productSlice.reducer;