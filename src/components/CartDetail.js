import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core';
import { CartContext } from '../contexts/CartContext';
import { appConfig } from '../services/config';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  total: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
});

const CartDetail = () => {
  const classes = useStyles();
  const { cart, removeFromCart } = useContext(CartContext);
  const { items = [] } = cart;
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar
                    alt={item.title}
                    src={`${appConfig.apiURL}${item.photo.url}`}
                    variant='square'
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{(item.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label='delete'
                    className={classes.margin}
                    size='small'
                    onClick={() => removeFromCart(item)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.total}>
        <Typography variant='h5'>${cart.cartTotal.toFixed(2)}</Typography>
      </div>
    </>
  );
};

export default CartDetail;
