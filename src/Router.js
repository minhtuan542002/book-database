import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ComicDetail from "./components/ComicDetail";
import NotFoundPage from "./components/NotFoundPage";

const AppRouter = ({ isAuthenticated }) => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Route */}
        <Route
          path="/comic/:id"
          element={
            isAuthenticated ? (
              <ComicDetail />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;