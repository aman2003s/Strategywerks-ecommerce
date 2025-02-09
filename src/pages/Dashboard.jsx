import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductsList from '../components/ProductsList';
import SortAndFilter from '../components/SortAndFilter';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  const { isLoading, anyError, allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('relevance');

  // Filter and sort products based on searchTerm, selectedCategory, and sortOrder
  const filteredProducts = allProducts
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.category.includes(selectedCategory))
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_asc':
          return a.rating - b.rating;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'relevance':
        default:
          return 0;
      }
    });

  return (
    <Box p={3}>
      <SortAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {anyError ? (
        <Typography color="error">Oops something went wrong....</Typography>
      ) : (
        <ProductsList allProducts={filteredProducts} isLoading={isLoading} />
      )}
    </Box>
  );
};

export default Dashboard;
