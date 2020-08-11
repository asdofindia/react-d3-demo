import React from 'react';
import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';

function App() {
  return (
    <div className="App">
      <BubbleChart data={[1, 2, 3, 4]}/>
    </div>
  );
}

export default App;
