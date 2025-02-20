import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

  <>
    <App />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </>
  ,
)
