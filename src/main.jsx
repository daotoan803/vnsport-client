import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './config/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { SideBarContextProvider } from './contexts/SideBarContext';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <SideBarContextProvider>
            <App />
          </SideBarContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);
