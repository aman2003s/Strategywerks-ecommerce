import React, { useState, forwardRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import ProductModal from './ProductModal';

const ProductCard = forwardRef(({ product }, ref) => {
    const [open, setOpen] = useState(false);

    //function to open product modal
    const handleOpen = () => setOpen(true);

    //function to close product modal
    const handleClose = () => setOpen(false);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} ref={ref}>
            <Card sx={{ height: '360px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardMedia
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    height={140}
                    sx={{ borderBottom: '1px solid #ccc' }}
                    loading="lazy"
                />
                <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="h5">${product.price}</Typography>
                    <Button variant="text" onClick={handleOpen}>View Details</Button>
                </CardContent>
            </Card>

            <ProductModal open={open} handleClose={handleClose} product={product} />
        </Grid>
    );
});

export default ProductCard;
