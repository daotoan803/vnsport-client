import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './config/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { SideBarContextProvider } from './contexts/SideBarContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { AuthContextProvider } from './contexts/AuthContext';
import DateAdapter from '@mui/lab/AdapterDateFns';
import viLocale from 'date-fns/locale/vi';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AlertContextProvider } from './contexts/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter} locale={viLocale}>
          <BrowserRouter>
            <AuthContextProvider>
              <AlertContextProvider>
                <ModalContextProvider>
                  <SideBarContextProvider>
                    <App />
                  </SideBarContextProvider>
                </ModalContextProvider>
              </AlertContextProvider>
            </AuthContextProvider>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);
