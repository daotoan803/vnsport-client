import React, { createContext, useState } from 'react';

const SideBarContext = createContext({
  sideBarIsOpen: false,
  toggleSideBar() {},
});

export default SideBarContext;

export const SideBarContextProvider = ({ children }) => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  return (
    <SideBarContext.Provider value={{ sideBarIsOpen, toggleSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};

