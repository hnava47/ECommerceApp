import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_CART, ALL_PRODUCTS, ALL_CATEGORIES } from '../utils/queries';

import {
    Header,
    MainFeaturedPost,
    FeaturedPost,
    Footer,
} from '../components'

const mainFeaturedPost = {
  title: 'Spring forward with fresh designs',
  description:
    "Brining you the best prices and widest selection of furniture and home decor!",
  image: 'https://www.absolunet.com/hubfs/Website%20Content/Industries/Clients%20Proof/Structube-1.jpg',
  imageText: 'Sample living room',
};

const theme = createTheme();

export const Home = () => {
  const allProducts = useQuery(ALL_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  const userCart = useQuery(USER_CART, {
    fetchPolicy: "network-only",
  });
  const allCategories = useQuery(ALL_CATEGORIES, {
    fetchPolicy: "network-only",
  });
  const [products, setProducts] = useState();
  const [count, setCount] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    if(userCart.loading === false && userCart.data) {
      setCount(userCart.data.cartCheckout.cart.length);
    }
  }, [userCart.loading, userCart.data]);

  useEffect(() => {
    if(allProducts.loading === false && allProducts.data) {
      setProducts(allProducts.data.products);
    }
  }, [allProducts.loading, allProducts.data]);

  useEffect(() => {
    if(allCategories.loading === false && allCategories.data) {
      setCategories(allCategories.data.categories);
    }
  }, [allCategories.loading, allCategories.data]);

  const addToCart = () => {
    setCount(count + 1);
  };

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {categories && (
          <Header
            title="Furniture E-Commerce"
            sections={categories}
            cartCount={count}
          />
        )}
        <main>
          <MainFeaturedPost
            post={mainFeaturedPost}
          />
          {products && (
            <Grid container spacing={4}>
              {products.map((product) => (
                <FeaturedPost key={product._id} post={product} addToCart={addToCart} />
              ))}
            </Grid>
          )}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default Home;
