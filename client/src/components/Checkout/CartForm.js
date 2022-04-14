import { Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery, useMutation } from '@apollo/client';
import { USER_CART } from '../../utils/queries';
import { UPDATE_CART } from '../../utils/mutations'

export const CartForm = () => {
    const { data, loading, refetch } = useQuery(USER_CART);
    const [updateCart] = useMutation((UPDATE_CART));
    const [cartData, setCartData] = useState();

    useEffect(() => {
        if(loading === false && data) {
            setCartData(data.cart);
        }
    }, [loading, data]);

    const updateQuantity = async (id, orderQuantity) => {
        try {
            await updateCart({
                variables: {
                    id,
                    orderQuantity
                }
            });

            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Cart summary
            </Typography>
            {cartData && (
                <List disablePadding>
                {cartData.map((cart) => (
                    <ListItem key={cart._id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={cart.productId.name} secondary={cart.productId.description} />
                        <Typography variant="body2" sx={{ mx:2 }}>{cart.productId.unitPrice}</Typography>
                        <ButtonGroup size="small">
                            <Button
                                aria-label="reduce"
                                onClick={() => {
                                    updateQuantity(cart._id, cart.orderQuantity-1);
                                }}
                            >
                                <RemoveIcon fontSize="small" />
                            </Button>
                            <Button>
                                {cart.orderQuantity}
                            </Button>
                            <Button
                                aria-label="increase"
                                onClick={() => {
                                    updateQuantity(cart._id, cart.orderQuantity+1);
                                }}
                            >
                                <AddIcon fontSize="small" />
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $34.06
                    </Typography>
                </ListItem>
                </List>
            )}
        </Fragment>
    );
}

export default CartForm;
