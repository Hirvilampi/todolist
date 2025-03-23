import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Home from './Home.tsx';
import Error from './Error.tsx';
import TodoList from './TodoList.tsx';
import ReactDOM from 'react-dom';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';

const router = createBrowserRouter([
  {
      path:"/",
      element: <App />,
      errorElement: <Error />,
      children: [
          {
              element: <Home />,
              index: true
          },
          {
              path:"todolist",
              element: <TodoList />,
          },
      ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
