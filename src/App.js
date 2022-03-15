import { Route,Routes, Navigate } from 'react-router-dom';

import NavBar from './UI/NavBar';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import Auth from './users/pages/Auth';
import UpdatePlace from './places/pages/updatePlace';

import { AuthContext } from './store/auth-context';
import React, { useCallback, useEffect, useState } from 'react';
import ("./index.css");

function App() {

  const [token,setToken] = useState(false);
  const [userId,setUserId] = useState(null);

  const login = useCallback( (uid,token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token}))
  },[]);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  },[]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData && userData.token){
      login(userData.userId,userData.token)
    }
  },[])

  return (  

    <AuthContext.Provider value={
      {
        isLoggedIn:!! token,
        token:token,
        userId:userId,
        login:login,
        logout:logout
      }}>

      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path=':userId/places' element={<UserPlaces></UserPlaces>} ></Route>
        <Route path="places/new" element={<NewPlace/>}/>
        <Route path=":placeId/update" element={<UpdatePlace/>}/>
        <Route path="auth" element={<Auth/>} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes> 
    </AuthContext.Provider>

  );
}

export default App;
