import { Fragment, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

import {
    AddressForm,
    CartForm,
    PaymentForm,
    Review
} from '../components/Checkout'

const steps = ['Cart details', 'Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CartForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    case 3:
      const cartData = JSON.parse(localStorage.getItem('cart'));
      const totalOrderPrice = JSON.parse(localStorage.getItem('totalOrderPrice'));
      return <Review cartData={cartData} totalOrderPrice={totalOrderPrice}/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />;
  }

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      localStorage.removeItem('cart');
      localStorage.removeItem('totalOrderPrice');
    };
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                      component='a'
                      href='/'
                      sx={{ mt: 3 }}
                    >
                        Back Home
                  </Button>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    component='a'
                    href='/'
                    sx={{ mt: 3, ml: 1 }}
                    onClick={() => {
                      localStorage.removeItem('cart');
                      localStorage.removeItem('totalOrderPrice');
                    }}
                  >
                      Cancel
                  </Button>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </Fragment>
            )}
          </Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;
