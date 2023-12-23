import React from 'react';
import { AppHeaderComponent } from './components/AppHeader/AppHeaderComponent';
import { FooterComponent } from './components/Footer/FooterComponent';
import { Outlet } from "react-router-dom";


function App() {
    return (
      <div className='text-center min-h-screen'>
          <AppHeaderComponent />
          <Outlet />
          <FooterComponent />
      </div>
    );
}

export default App;
