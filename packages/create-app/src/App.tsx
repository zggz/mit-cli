// import logo from './logo.svg'
import { useState } from 'react'
import './App.css'

function App () {
  const [count, setCount] = useState(1)
  return (
    <div className="App foo">
      <div className="grid">
        <div className="grid-cell"></div>
      </div>
      hao l ma er 45 67 89 10 TH GG 234
      12134567890==1245
      <h2>15</h2>
      16789900----!!==??==  uu
      <button onClick={() => setCount(c => c + 1)}>add{count}</button>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit12-13-14-15-16<code>src-App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
