import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './lib/reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { Providers } from './app/provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);

reportWebVitals();