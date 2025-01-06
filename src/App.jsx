import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Aunthentication/Login';

import ProjectSelection from './components/ProjectSelection';
import Message from './components/Message';
import EmailVarification from './components/EmailVarificaton';
import Home from './components/Home';

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/emailverification" element={<EmailVarification />} />
        {/* <Route path="/project-selection" element={<ProjectSelection />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
