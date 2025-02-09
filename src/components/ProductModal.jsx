import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const ProductModal = ({ open, handleClose, product }) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {product.title}
                <IconButton
                    onClick={handleClose}
                    style={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>{product.description}</Typography>
                <Typography>Category: {product.category}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Carousel>
                    {product.images.map((image, index) => (
                        <Paper key={index}>
                            <img
                                src={image}
                                alt={`${product.title} image ${index + 1}`}
                                loading="lazy"
                                style={{ maxHeight: '320px', maxWidth: '320px', objectFit: 'contain', display: 'block', margin: 'auto' }}
                            />
                        </Paper>
                    ))}
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
