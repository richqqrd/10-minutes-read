import React from 'react';
import './App.css';
import { AppHeaderComponent } from './components/AppHeader/AppHeaderComponent';
import { FooterComponent } from './components/Footer/FooterComponent';
import { TableHeaderComponent } from './components/Table/TableHeaderComponent';
import { Outlet } from "react-router-dom";


function App() {
    return (
      <div className="App">
          <AppHeaderComponent />
          <Outlet />
          <FooterComponent />
      </div>
    );
}

export default App;
