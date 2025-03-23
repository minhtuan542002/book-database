import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import OwnerHome from "./components/OwnerHome";
import Login from "./components/Login";
import ComicDetail from "./components/ComicDetails";
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = ({ isAuthenticated }) => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/addedit" element={<OwnerHome />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route */}
        <Route
          path="/manage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OwnerHome />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;