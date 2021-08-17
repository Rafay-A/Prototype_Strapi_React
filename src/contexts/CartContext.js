import React, { useState, createContext } from 'react';

export const CartContext = createContext();
const STORAGE_ITEM = 'cart';

export const CartProvider = ({ children }) => {
  const initialItems = JSON.parse(localStorage.getItem(STORAGE_ITEM)) || [];

  const calculateCartTotal = items => {
    localStorage.setItem(STORAGE_ITEM, JSON.stringify(items));
    const itemsCount = items.reduce((prev, curr) => prev + curr.quantity, 0);
    const cartTotal = items.reduce(
      (prev, curr) => prev + curr.quantity * curr.price,
      0
    );

    return { itemsCount, cartTotal };
  };

  const [cart, setCart] = useState({
    items: initialItems,
    ...calculateCartTotal(initialItems),
  });

  const addToCart = product => {
    const { items = [] } = cart;
    const productIndex = items.findIndex(item => item.id === product.id);
    if (productIndex === -1) {
      items.push({
        ...product,
        quantity: 1,
      });
    } else {
      items[productIndex].quantity++;
    }

    setCart({
      items,
      ...calculateCartTotal(items),
    });
  };

  const removeFromCart = product => {
    const { items = [] } = cart;
    const productIndex = items.findIndex(item => item.id === product.id);
    if (productIndex !== -1) {
      items.splice(productIndex, 1);
    }

    setCart({
      items,
      ...calculateCartTotal(items),
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
