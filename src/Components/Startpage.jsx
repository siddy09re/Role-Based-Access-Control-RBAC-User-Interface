import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './Loginpage';
import App from '../App';

function Startpage() {
  return (
    <Routes>
      
      <Route path="/" element={<Loginpage />} />
      <Route path="/apppage" element={<App />} />
      

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Startpage;
