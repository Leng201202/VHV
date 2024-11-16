import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Footer } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import { Login } from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './components/auth/PrivateRoute';
import PageNotFound from './components/auth/PageNotFound';
import Admin from './components/admin/Admin';
import Header from './components/common/Header';
import SideMenu from './components/common/SideMenu';
import PublicElement from './components/RouteElement/PublicElement';
import UserElement from './components/RouteElement/UserElement';

function App() {
  const USER_TYPES = {
    PUBLIC: "Public User",
    NORMAL_USER: "Normal User",
    ADMIN_USER: "Admin User"
  };

  const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER; // Example: Current logged-in user type

  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token') !== true;

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Header />}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {!isAuthPage && <SideMenu />}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/admin/listofpatient" element={<div>List of Patient</div>} />
            <Route path="/admin/recordeddata" element={<div>Recorded Data</div>} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route
              path="/user/recordpatient"
              element={<UserElement USER_TYPES={CURRENT_USER_TYPE}><div>Service</div></UserElement>}
            />
            <Route
              path="/user/dashboard"
              element={<UserElement USER_TYPES={CURRENT_USER_TYPE}><div>Service</div></UserElement>}
            />
            <Route
              path="/user/history"
              element={<UserElement USER_TYPES={CURRENT_USER_TYPE}><div>Service</div></UserElement>}
            />
            <Route path="/login" element={<PublicElement><Login /></PublicElement>} />
            <Route path="/signup" element={<PublicElement><Signup /></PublicElement>} />
         
            <Route path="*" element={<PublicElement><PageNotFound /></PublicElement>} />
          </Routes>
        </div>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
