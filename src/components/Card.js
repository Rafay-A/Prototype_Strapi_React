import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ItemCard from '../components/ItemCard';
import { fetchProducts } from '../services/api';

const Card = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <Container>
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid key={product.id} xs={12} md={4} item>
          <ItemCard product={product} />
        </Grid>
      ))}
    </Grid>
    </Container>
    </>
  );
};

Card.propTypes = {};

export default Card;
