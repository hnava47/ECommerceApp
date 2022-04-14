import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useMutation } from '@apollo/client';
import { ADD_CART } from '../../utils/mutations';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const FeaturedPost = (props) => {
  const { post, addToCart } = props;
  const [addCart] = useMutation(ADD_CART);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleAddCart = async () => {
    try {
      await addCart({
        variables: {
          productId: post._id
        }
      });

      addToCart();

      handleClick();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {`$${post.unitPrice.toFixed(2)}`}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <IconButton color="secondary" aria-label="add to shopping cart" onClick={handleAddCart}>
              <AddShoppingCartIcon />
            </IconButton>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, height: 200, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
          />
        </Card>
      </CardActionArea>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully added to cart!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
