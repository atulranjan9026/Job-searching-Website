import React from 'react'
import ReactDOM from 'react-dom/client'
import Form from './usersPage/homePages/new';
import Login  from './usersPage/Auth/Login';
import Signup from './usersPage/Auth/Signup';
import Seeker from './seeker/seeker';
import FirstPage from './firstPage/firstPage';
import SignupSeeker from './seeker/signupSeeker';
import LoginSeeker from './seeker/loginSeeker';
import { createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PersonDetails from "./usersPage/PersonDetails/PersonDetails"

const AppLayout =()=>{
  return(<>
  <Header/>
  <Outlet/>
  <Footer/>
  </>
  );
};

const appRouter = createBrowserRouter([
  { 
    path:"/",
    element:<AppLayout/>,
    children:[
        { path:'/' ,element:<FirstPage />,},
        { path:'/form' ,element:<Form/>,},
        { path:'/login' ,element:<Login />,},
        { path:'/signup' ,element:<Signup />,},              
        { path:'/seeker' ,element:<Seeker />,},           
        { path:'/about' ,element:<About />,},           
        { path:'/policy' ,element:<Policy />,},           
        { path:'/contact' ,element:<Contact />,},           
        { path:'/personDetails/:id' ,element:<PersonDetails />,},           
        { path:'/signupSeeker' ,element:<SignupSeeker />,},           
        { path:'/loginSeeker' ,element:<LoginSeeker />,}  
      ],        
    },
  ]);

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <RouterProvider router={appRouter}>
      <AppLayout />
    </RouterProvider>
  );