import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        filteredData: [],
        clearFilter: false,
        latestProducts: [],
    },
    reducers: {
        addData: (state, action) => {
            state.data = action.payload;
            state.latestProducts = action.payload
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5);
        },
        addFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        clearAllFilter: (state, action) => {
            state.clearFilter = action.payload
        }
    },
});

export const { addData, addFilteredData, clearAllFilter } = productSlice.actions;
export default productSlice.reducer;
