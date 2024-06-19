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
import Payment from "./usersPage/Payment/Payment"
import Painter from './Productcategory/All/painter';
import Driver from './Productcategory/All/driver';
import Electrician from './Productcategory/All/electrician';
import Gardener from './Productcategory/All/gardener';
import Cook from './Productcategory/All/cook';
import Reviews from './usersPage/PersonDetails/Reviews';
import Book from './usersPage/PersonDetails/Book';
import Admin from './Admin/Admin';

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
        { path:'/form/:UserEmail' ,element:<Form/>,},
        { path:'/login' ,element:<Login />,},
        { path:'/signup' ,element:<Signup />,},              
        { path:'/seeker/:email' ,element:<Seeker />,},           
        { path:'/about' ,element:<About />,},           
        { path:'/policy' ,element:<Policy />,},           
        { path:'/contact' ,element:<Contact />,},           
        { path:'/personDetails/:id/:email' ,element:<PersonDetails />,},           
        { path:'/signupSeeker' ,element:<SignupSeeker />,},           
        { path:'/loginSeeker' ,element:<LoginSeeker />,}, 
        { path:'/payment/:id/:name/:userName/:salary' ,element:<Payment />,},  
        { path:'/painter' ,element:<Painter />,},  
        { path:'/driver' ,element:<Driver />,},  
        { path:'/electrician' ,element:<Electrician />,},  
        { path:'/gardener' ,element:<Gardener />,}, 
        { path:'/cook' ,element:<Cook />,}, 
        { path:'/reviews/:name/:userName/:id/:salary' ,element:<Reviews />,},
        { path:'/book/:id' ,element:<Book />,},
        { path:'/admin' ,element:<Admin />,}
      ],        
    },
  ]);

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <RouterProvider router={appRouter}>
      <AppLayout />
    </RouterProvider>
  );