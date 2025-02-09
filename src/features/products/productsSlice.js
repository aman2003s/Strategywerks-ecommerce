import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProducts: [],
  isLoading: false,
  anyError: false,
};

// Thunk for fetching more products with pagination
export const getMoreProducts = createAsyncThunk('products/fetchMoreProducts', async (skip) => {
  const response = await fetch(`https://dummyjson.com/products?limit=12&skip=${skip}`);
  const data = await response.json();
  return data.products;
});

// Thunk for searching products by category and term
export const searchProducts = createAsyncThunk('products/searchProducts', async ({ category, term }) => {
  let fetchUrl = `https://dummyjson.com/products/${category}/?q=${term}`;
  if (category === 'All') {
    fetchUrl = `https://dummyjson.com/products/search?q=${term}`;
  } else if (term === '') {
    fetchUrl = `https://dummyjson.com/products/category/${category}`;
  }
  const response = await fetch(fetchUrl);
  const data = await response.json();
  return data.products;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoreProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Merge new products into state without duplicating existing ones
        const newProducts = action.payload.filter((newProduct) => {
          return !state.allProducts.some((existingProduct) => existingProduct.id === newProduct.id);
        });
        state.allProducts = [...state.allProducts, ...newProducts];
      })
      .addCase(getMoreProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoreProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.anyError = true;
        console.error(action.error.message);
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.anyError = true;
        console.error(action.error.message);
      });
  },
});

export default productsSlice.reducer;
