import React, { createContext, useContext, useEffect, useState } from 'react';

import cartApi from '../apis/cart.api';
import AuthContext from './AuthContext';
import AlertContext from './AlertContext';

const CartContext = createContext({
  cart: [],
  totalPrice: 0,
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const loadUserCart = () =>
    cartApi.getUserCart().then(({ data }) => {
      setCart(data.cart);
    });

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach(
      (product) =>
        (totalPrice +=
          product.quantity * Number(product.discountPrice || product.price))
    );

    setTotalPrice(totalPrice);
  }, [cart]);

  useEffect(() => {
    if (authContext.token) {
      loadUserCart();
    }
  }, [authContext.token]);

  const addProduct = (productId, quantity = 1) => {
    cartApi.addProductToUserCart(productId, quantity);
    alertContext.showSuccessAlert('Thêm sản phẩm vào giỏ hàng thành công 🎉');
    return loadUserCart();
  };

  const updateQuantity = (productId, quantity = 1) => {
    const promise = cartApi.updateProductQuantityInUserCart(
      productId,
      quantity
    );
    setCart((prev) =>
      prev.map((product) => {
        if (product.id === productId) product.quantity = quantity;
        return product;
      })
    );
    return promise;
  };

  const removeProduct = (productId) => {
    const promise = cartApi.updateProductQuantityInUserCart(productId, 0);
    setCart((prev) => prev.filter((product) => productId !== product.id));
    return promise;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addProduct,
        updateQuantity,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
