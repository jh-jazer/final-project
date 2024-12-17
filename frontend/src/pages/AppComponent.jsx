// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HighlightProvider } from './HighlightContext';
import Sidebar from '../pages/CreateApplication';
import HighlightButton from './HighlightButton';
import Details from './CreateAppPages/Details';
import Personal from './CreateAppPages/Personal'

function App() {
  return (
    <Router>
      <HighlightProvider>
        <Sidebar />
        <div className="content">
          <HighlightButton />
          <Routes>
            <Route path="/createapplication" element={<Details />} />
            <Route path="/personal" element={<Personal />} />
          </Routes>
        </div>
      </HighlightProvider>
    </Router>
  );
}

export default App;
