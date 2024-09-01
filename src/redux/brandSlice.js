import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        brands: [],
        selectedBrand : null,
    },
    reducers: {
        addBrands: (state, action) => {
            state.brands = action.payload;
        },
        setSelectedBrand : (state, action) => {
            state.selectedBrand = action.payload
        }
    },
});

export const { addBrands, setSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;
