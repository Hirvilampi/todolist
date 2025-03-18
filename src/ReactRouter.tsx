import './index.css';

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './Contact';
import ReactDOM from 'react-dom';
import React from 'react';
import Home from './Home';
import About from './About';
import App from './App';


const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);