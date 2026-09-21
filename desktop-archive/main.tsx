import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getCurrentWindow } from '@tauri-apps/api/window'
import './index.css'
import App from './App.tsx'
import Gallery from './Gallery.tsx'

const appWindow = getCurrentWindow();

if (appWindow.label === 'gallery') {
  document.body.classList.add('is-gallery');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {appWindow.label === 'gallery' ? <Gallery /> : <App />}
  </StrictMode>,
)
