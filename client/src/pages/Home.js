import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_CART, ALL_PRODUCTS } from '../utils/queries';

import {
    Header,
    MainFeaturedPost,
    FeaturedPost,
    Footer,
} from '../components'


const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

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
  const [count, setCount] = useState();
  const [products, setProducts] = useState();

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
        <Header
          title="E-Commerce"
          sections={sections}
          cartCount={count}
        />
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
