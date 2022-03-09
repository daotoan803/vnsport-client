import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
// import { SocketContextProvider } from './contexts/SocketContext';
// import { ChatContextProvider } from './contexts/ChatContext';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter} locale={viLocale}>
            <BrowserRouter>
              <AuthContextProvider>
                {/* <ChatContextProvider> */}
                <AlertContextProvider>
                  <ModalContextProvider>
                    <SideBarContextProvider>
                      <App />
                    </SideBarContextProvider>
                  </ModalContextProvider>
                </AlertContextProvider>
                {/* </ChatContextProvider> */}
              </AuthContextProvider>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </CssBaseline>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
