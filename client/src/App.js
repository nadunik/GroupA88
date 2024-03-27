import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import UserName from './components/UserName';
import Password from './components/Password';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';

const router = createBrowserRouter(
    [
        {
            path : '/',
            element : <UserName></UserName>
        },
        {
            path : '/register',
            element : <Register></Register>
        },
        {
            path : '/password',
            element : <Password></Password>
        },
        {
            path : '/recovery',
            element : <Recovery></Recovery>
        },
        {
            path : '/reset',
            element : <Reset></Reset>
        },
        {
            path : '/Profile',
            element : <Profile></Profile>
        },
        {
            path : '*',
            element : <PageNotFound></PageNotFound>
        },

    ]
)
export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
    
  )
}
