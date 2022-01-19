import React from 'react'
import ReactDOM from 'react-dom'
import '@/index.css'
import App from '@/App'
import 'virtual:svg-icons-register'
console.log(import.meta.env, window.__APP_VERSION__)
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
