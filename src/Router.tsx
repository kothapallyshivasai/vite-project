import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './Components/Form';
import SecondPage from './Components/Home';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/home" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;