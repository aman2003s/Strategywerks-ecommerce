import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { Box, Grid } from '@mui/material';
import ProductCardSkeleton from './ProductCardSkeleton';
import { getMoreProducts } from '../features/products/productsSlice';

// Debounce function to delay execution
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ProductsList = ({ allProducts, isLoading }) => {
  const observer = useRef();
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);

  //Intersection observer to create infinite scroll
  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      const debouncedFetchMoreProducts = debounce(() => {
        setSkip((prevSkip) => {
          const newSkip = prevSkip + 12;
          // Dispatch action to get more products
          dispatch(getMoreProducts(newSkip));
          return newSkip;
        });
      }, 500);

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Debounced funnction to Dispatch action to get more products on intersection
          debouncedFetchMoreProducts();
        }
      });

      if (node) {
        //Observe if node is present
        observer.current.observe(node);
      }
    },
    [isLoading, dispatch]
  );

  useEffect(() => {
    // Dispatch action to get more products
    dispatch(getMoreProducts(skip));
  }, [skip, dispatch]);

  return (
    <Box mt={3}>
      <Grid container spacing={4}>
        {allProducts.map((product, index) =>
          index === allProducts.length - 1 ? (
            <ProductCard ref={lastProductRef} product={product} key={product.id} />
          ) : (
            <ProductCard product={product} key={product.id} />
          )
        )}
        {isLoading && Array.from(new Array(8)).map((_, index) => <ProductCardSkeleton key={index} />)}
      </Grid>
    </Box>
  );
};

export default ProductsList;
