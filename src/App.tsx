import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './pages/MapPage';
import Index from './pages';
import { GW2ApiAccountProvider } from './context/apiContext';


function App() {
  return (
    <GW2ApiAccountProvider>
      <Router>
        <Routes>
          <Route path="/map/:name" element={<MapPage />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </GW2ApiAccountProvider>
  );
}

export default App
