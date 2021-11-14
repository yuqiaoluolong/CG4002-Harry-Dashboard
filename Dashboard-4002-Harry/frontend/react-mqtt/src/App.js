import React from 'react';
import Mqtt from './components/mqtt/'
import './App.css';

function App() {
  return (
    <div className="App">
      <head>dashboard</head>
      <h1><font face="times">Dance Dance Dance!</font></h1>
      <Mqtt />
    </div>
  );
}

export default App;
