import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {RecoilRoot} from 'recoil'
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ToastContainer/>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
)
