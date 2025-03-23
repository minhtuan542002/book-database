import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from "./components/Home";
import OwnerHome from "./components/OwnerHome";
import Login from "./components/Login";
import AuthNav from "./components/AuthNav";
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = ({ isAuthenticated }) => {
  const WithNavbar = () => {
    return (
      <>
        <AuthNav />
        <div className="content-container">
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Navbar layout */}
        <Route element={<WithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/addedit" element={<OwnerHome />} />

          {/* Protected Route */}
          <Route path="/manage" element={
            <ProtectedRoute>
              <OwnerHome />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* No layout */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;