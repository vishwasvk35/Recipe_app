import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'
import './components/App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <p className='disclaimer'>This website is using free version of an API, if daily limit of API is exhausted then you might not be able to see recipes</p>
    <App />
  </StrictMode>,
)
