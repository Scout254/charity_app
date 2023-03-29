import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (WrappedComponent: React.FC) => {
  const Layout: React.FC = (props) => (
    <>
    <div className=" ">
    
   
 
      
    <div className="flex flex-row h-screen">
        <div className="w-1/5 ">
          <Sidebar />
        </div>
        <div className="w-4/5 overflow-y-auto bg-gray-200">
        <Navbar  />
          <WrappedComponent {...props} />
        </div>
      </div>
    </div>
    </>
  );
  return Layout;
};

export default Layout;
