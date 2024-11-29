import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Sjf from './components/SJF.jsx';
import FCFS from './components/FCFS.jsx';
import SRTF from './components/SRTF.jsx';
import PRIORITY from './components/PRIORITY.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sjf',
    element: <Sjf />,
  },
  {
    path: '/fcfs',
    element: <FCFS />,
  },
  {
    path: '/srtf',
    element: <SRTF />,
  },
  {
    path: '/priority',
    element: <PRIORITY />,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
