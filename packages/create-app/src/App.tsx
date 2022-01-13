// import Logo from './logo.svg'
import { useState } from 'react'
import './App.css'

function App () {
  const [count, setCount] = useState(1)
  return (
    <div className="App foo">
      <div className="grid">
        <div className="grid-cell"></div>
      </div>

12

45
      <button onClick={() => setCount(c => c + 1)}>add{count}</button>
      <header className="App-header">
        {/* <img src={Logo} className="App-logo" alt="logo" /> */}
        <p>
          12
          34
          <code>src-App.js</code> and save to reload.
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
