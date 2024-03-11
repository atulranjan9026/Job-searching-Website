import React from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Home from "../pages/Home.jsx"
// import Result from "../pages/result.jsx";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Header />
        <Home />
        {children}
        {/* <Result/>
        {title} */}
      <Footer />
    </div>
  );
};



export default Layout;
