import React, {useState, useEffect} from 'react';
import './App.css';
import Histogram from './components/Histogram';


function App() {
  const [data, setData] = useState([40, 30, 20, 10]);

  const [input, setInput] = useState(data.join(" "))

  useEffect(() => {
    setData(input.split(" ").map(i => parseInt(i, 10)).filter(i => !isNaN(i)))
  }, [input])

  return (
    <div className="App" style={{display: `flex`, flexWrap: `wrap`}}>
      <div style={{display: `flex`, flexDirection: `column`}}>
        <p>Wanna see a dynamic d3 graph made within react?</p>
        <p>Change the numbers below</p>
        <input value={input} onChange={e => setInput(e.target.value)}/>
      </div>
      <Histogram data={data} height="300px" width="400px"/>
    </div>
  );
}

export default App;
