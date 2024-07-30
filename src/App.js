import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

import {BrowserRouter, Link,Route,Routes} from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [CurrentRoute,setCurrentRoute] = useState();
  
  // this allows to keep the current tab and the path selected
  // even after reloading the page 
  useEffect(() =>{
    const path = window.location.pathname;
    setCurrentRoute(path.slice(1, path.length));
  }, [])
  //----------------------------------
  
  return (
    <>
    <BrowserRouter>
      <nav className='m-3 p-3 border border-info bg-dark'>
        <ul className="nav na-pills">
          <li>
            <Link onClick={() => setCurrentRoute("Home")}
              className={CurrentRoute==='Home'
                ?'btn btn-info ms-2'
                :'btn btn-outline-info ms-2' }
              to={"/Home"}>Home</Link>
          </li>
          <li>
            <Link onClick={() => setCurrentRoute("Products")}
              className={CurrentRoute==='Products'
                ?'btn btn-info ms-2'
                :'btn btn-outline-info ms-2' }
              to={"/Products"}>Products</Link> 
          </li>
          <li>
            <Link onClick={() => setCurrentRoute("NewProduct")}
              className={CurrentRoute==='NewProduct'
                ?'btn btn-info ms-2'
                :'btn btn-outline-info ms-2' }
              to={"/NewProduct"}>New Product</Link> 
          </li>
          
        </ul>
      </nav>
      <Routes>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/Products" element={<Products/>}></Route>
        <Route path="/NewProduct" element={<NewProduct/>}></Route>

      </Routes>
    </BrowserRouter>
     
    </>
  );
}

export default App;
