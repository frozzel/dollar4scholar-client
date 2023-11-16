import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import ContextProviders from './context/index.jsx';
import App from './App.jsx'
import './index.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProviders>
         <App />
      </ContextProviders>
    </BrowserRouter>
  </React.StrictMode>,
)
