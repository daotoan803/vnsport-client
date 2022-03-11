import React, { createContext, useContext, useEffect, useState } from 'react';

import cartApi from '../apis/cart.api';
import AuthContext from './AuthContext';

const CartContext = createContext({
  cart: [],
  // eslint-disable-next-line no-unused-vars
  addProduct(productId) {},
  // eslint-disable-next-line no-unused-vars
  updateQuantity(productId, newQuantity) {},
  // eslint-disable-next-line no-unused-vars
  removeProduct(productId) {},
});
export default CartContext;

// const localCart = {
//   addProduct(productId, quantity = 1) {
//     const cart = this.getCart();
//     if (cart[productId]) {
//       cart[productId].quantity += quantity;
//     } else {
//       cart[productId] = { productId, quantity };
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
//   },

//   getCart() {
//     return JSON.parse(localStorage.getItem('cart'));
//   },

//   updateQuantity(productId, quantity = 1) {
//     this.addProduct(productId, quantity);
//   },
// };

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const authContext = useContext(AuthContext);

  const loadUserCart = () =>
    cartApi.getUserCart().then(({ data }) => {
      setCart(data.cart);
    });

  useEffect(() => {
    if (authContext.token) {
      loadUserCart();
    }
  }, [authContext.token]);

  const addProduct = (productId, quantity = 1) => {
    cartApi.addProductToUserCart(productId, quantity);
    return loadUserCart();
  };

  const updateQuantity = (productId, quantity = 1) => {
    cartApi.updateProductQuantityInUserCart(productId, quantity);
    return loadUserCart();
  };

  const removeProduct = (productId) => {
    cartApi.updateProductQuantityInUserCart(productId, 0);
    return loadUserCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateQuantity,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
