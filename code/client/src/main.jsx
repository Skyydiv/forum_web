import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
// import './index.css'
import PageHandler from "./components/PageHandler.jsx"


// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login/>
//   },
//   {
//     path: "/register",
//     element: <Register/>
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageHandler/>
  </React.StrictMode>,
)
