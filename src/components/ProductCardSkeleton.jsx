import { Card, CardMedia, CardContent, Typography, Skeleton, Grid } from '@mui/material';

const ProductCardSkeleton = () => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card sx={{ height: '360px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <CardMedia>
                    <Skeleton variant="rectangular" sx={{ borderBottom: '1px solid #ccc' }} height={140} />
                </CardMedia>
                <CardContent>
                    <Typography variant="h6">
                        <Skeleton width="80%" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width="60%" />
                    </Typography>
                    <Typography variant="h5">
                        <Skeleton width="40%" />
                    </Typography>
                    <Skeleton variant="rectangular" width={100} height={30} />
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductCardSkeleton;
