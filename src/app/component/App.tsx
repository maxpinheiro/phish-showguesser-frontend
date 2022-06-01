import React from 'react';
import Navbar from '../../shared/component/Navbar';
import AppRouter from '../App.router';

function App() {
  return (
    <div className="App" id="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
