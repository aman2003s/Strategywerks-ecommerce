import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import { searchProducts, getMoreProducts } from '../features/products/productsSlice';

// Component for sorting and filtering products
const SortAndFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
    const dispatch = useDispatch(); // Hook to dispatch actions
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm); // Local state for search term with debounce

    useEffect(() => {
        // Update searchTerm with debounce
        const handler = setTimeout(() => {
            setSearchTerm(localSearchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [localSearchTerm, setSearchTerm]);

    // Handle search button click
    const handleSearch = () => {
        if (selectedCategory !== 'All' || localSearchTerm !== '') {
            // Dispatch search action if there's a category or search term
            dispatch(searchProducts({ category: selectedCategory, term: localSearchTerm }));
        } else {
            // Dispatch action to get more products if no filters
            dispatch(getMoreProducts(0));
        }
    };

    return (
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={3}>
            {/* Search Field */}
            <TextField
                id="search-field"
                label="Search"
                variant="outlined"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                fullWidth
            />
            {/* Category Field */}
            <TextField
                id="category-field"
                label="Category"
                variant="outlined"
                select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
            >
                {/* Category options */}
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="beauty">Beauty</MenuItem>
                <MenuItem value="fragrances">Fragrances</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="groceries">Groceries</MenuItem>
                <MenuItem value="home-decoration">Home</MenuItem>
                <MenuItem value="kitchen-accessories">Kitchen</MenuItem>
                <MenuItem value="laptops">Laptops</MenuItem>
                <MenuItem value="mens-shirts">Mens</MenuItem>
                <MenuItem value="tops">Womens</MenuItem>
                <MenuItem value="mobile-accessories">Mobile</MenuItem>
                <MenuItem value="motorcycle">Motorcycle</MenuItem>
                <MenuItem value="skin-care">Skin Care</MenuItem>
                <MenuItem value="sports-accessories">Sports</MenuItem>
                <MenuItem value="sunglasses">Sunglasses</MenuItem>
                <MenuItem value="tablets">Tablets</MenuItem>
                <MenuItem value="smartphones">Smartphones</MenuItem>
            </TextField>
            {/* Sort By Field */}
            <TextField
                id="sort-field"
                label="Sort By"
                variant="outlined"
                select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                fullWidth
            >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
                <MenuItem value="rating_asc">Rating: Low to High</MenuItem>
                <MenuItem value="rating_desc">Rating: High to Low</MenuItem>
            </TextField>
            {/* Search Button */}
            <Box display="flex" justifyContent={{ xs: 'flex-start', sm: 'flex-start' }} width="100%">
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: { xs: 2, sm: 0 } }}>
                    Search
                </Button>
            </Box>
        </Box>
    );
};

export default SortAndFilter;
