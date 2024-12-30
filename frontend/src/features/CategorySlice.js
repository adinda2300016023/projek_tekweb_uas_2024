import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        try {
            const response = await axios.get("http://localhost:5500/categories");
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
);

const categoryEntity = createEntityAdapter({
    selectId: (category) => category.id,
});

const categorySlice = createSlice({
    name: "category",
    initialState: categoryEntity.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            console.log("Categories fetched:", action.payload);
            categoryEntity.setAll(state, action.payload);
        });
        builder.addCase(getAllCategory.rejected, (state, action) => {
            console.error("Failed to fetch categories:", action.error);
        });
    },
});

export const categorySelectors = categoryEntity.getSelectors(
    (state) => state.category
);

export default categorySlice.reducer;