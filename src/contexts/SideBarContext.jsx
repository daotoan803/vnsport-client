import React, { createContext, useState } from 'react';

const SideBarContext = createContext({
  sideBarIsOpen: false,
  cartIsOpen: false,
  toggleSideBar() {},
  toggleCart() {},
});

export default SideBarContext;

export const SideBarContextProvider = ({ children }) => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

  return (
    <SideBarContext.Provider
      value={{ sideBarIsOpen, cartIsOpen, toggleSideBar, toggleCart }}>
      {children}
    </SideBarContext.Provider>
  );
};
