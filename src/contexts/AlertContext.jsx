import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext({
  showSuccessAlert(message) {
    message;
  },
});
export default AlertContext;

export const AlertContextProvider = ({ children }) => {
  const [successAlertIsShowing, setSuccessAlertIsShowing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showSuccessAlert = (message) => {
    setSuccessAlertIsShowing(true);
    setAlertMessage(message);
  };

  return (
    <AlertContext.Provider value={{ showSuccessAlert }}>
        <Snackbar
          open={successAlertIsShowing}
          autoHideDuration={3000}
          anchorOrigin={{horizontal: 'right', vertical:'top'}}
          onClose={() => {
            setSuccessAlertIsShowing(false);
          }}>
          <Alert severity="success">{alertMessage}</Alert>
        </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};
