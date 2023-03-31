import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      
      
      <Dashboard data-testid="dashboard"></Dashboard>
    </div>
  );
}

export default App;
