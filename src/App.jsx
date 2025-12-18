import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KeyList from './pages/KeyList';
import KeyDetail from './pages/KeyDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KeyList />} />
        <Route path="/key/:id" element={<KeyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
