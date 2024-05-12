import React, { useState } from 'react';
import { AppHeaderComponent } from './components/AppHeader/AppHeaderComponent';
import { FooterComponent } from './components/Footer/FooterComponent';
import { Outlet } from "react-router-dom";
import { User } from './user';
import { UserContext } from './userContext';


function App() {
   const [accessToken, setAccessToken] = useState("");
   const [email, setEmail] = useState("");
   const [id, setId] = useState(0);
   const [password, setPassword] = useState("");

   const user: User = {
    accessToken,
    setAccessToken,
    email, 
    setEmail, 
    id, 
    setId,
    password, 
    setPassword
   }

    return (
      <UserContext.Provider value={user}>
        <div className='text-center min-h-screen'>
            <AppHeaderComponent />
              <Outlet />
            <FooterComponent />
        </div>
      </UserContext.Provider>
    );
}

export default App;
