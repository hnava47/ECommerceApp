import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_CART } from '../utils/queries';

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

const featuredPosts = [
  {
    title: 'Featured post',
    id: '62578866fee12d7430094e82',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    id: '62578866fee12d7430094e82',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'TEST',
    id: '62578866fee12d7430094e82',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

const theme = createTheme();

export const Home = () => {
  const { data, loading } = useQuery(USER_CART);
  const [count, setCount] = useState();

  useEffect(() => {
    if(loading === false && data) {
      setCount(data.cart.length);
    }
  }, [loading, data])

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
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} cartCount={count} />
            ))}
          </Grid>
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
