import App from './App';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './Contact';
import React from 'react';
import Home from './Home';
import About from './About';
import ReactDOM from 'react-dom';

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
)
