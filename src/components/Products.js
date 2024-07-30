import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { checkProduct, deleteProduct, getProducts } from '../app/app';
import axios from 'axios';
 

export default function Products() {
  const [state, setState] = useState({
    products: [],
    currentPage : 1,
    pagesize : 4,
    keyword: "",
    totalPages : 0,
  });
  
  /* handle update of products */
  useEffect(()  => {
    handleGetProducts(state.keyword, state.currentPage, state.pagesize)},[]);

  
   
  const handleGetProducts = (keyword, page, size) => {
    getProducts(keyword, page, size)
      .then((resp)  =>{
        const totalElements = resp.headers["x-total-count"];
        let totalPages = Math.floor(totalElements/size);
        if (totalElements % size != 0) ++totalPages;
        setState({
            ...state,
            products: resp.data,
            keyword: keyword, 
            currentPage: page, 
            pagesize: size,
            totalPages: totalPages,
          });
      })
      .catch((err) =>{
        console.log(err);
    })
  };

  /* handle check state changing */
  const handleCheckStateChange =(product)=>{
     checkProduct(product).then((resp) =>{
      const newProducts = state.products.map((p)=>{
        if(p.id == product.id){
          p.checked = !p.checked;
        }
        return p;
      });
      setState({...state, products: newProducts});
     })
  };

  /* handle deletion of products */
  const handleProductDelete=(product)=>{
    deleteProduct(product).then((resp)=>{
      const newProducts = state.products.filter((p)=> p.id != product.id)
      setState({...state, products: newProducts})
    }) 
    };
  

  return (
    <div className='p-2 m-2'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th> 
                      <th>Price</th>
                      <th>Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    { state.products.map(product => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                          <button onClick={() => handleCheckStateChange(product)}
                            className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={ product.checked?faCheckCircle  : faCircle}>
                              </FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-outline-danger"
                           onClick={()=>handleProductDelete(product)}>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ul className='nav nav-pills'>
                  
                      {
                        (new Array(state.totalPages).fill(0)).map((v, index) => (
                          <li>
                            <button>{index+1}</button>
                          </li>
                        ))
                      }
                    
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  