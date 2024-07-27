import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {  faCheckCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteProducts, getProducts } from '../app/app';


export default function Products() {
  const [products, setProducts] = useState([]);
  
  /* handle update of products */
  useEffect(()  => {
    handleGetProducts();
  },[]);

  const handleGetProducts = () => {
    getProducts()
      .then((resp) =>{
      setProducts(resp.data);
    })
      .catch((err) =>{
        console.log(err);
    })
  };

  /* handle check state changing */
  const handleCheckStateChange =(product)=>{
    const newProducts = products.map(p =>{
      if(p.id === product.id){
        p.checked=!p.checked;
      };
      return p;
    } );
    setProducts(newProducts);

  };

  /* handle deletion of products */
  const handleProductDelete=(product)=>{
     deleteProducts(product.id)
      .then(resp=>{
      handleGetProducts(product)}).catch(err=>{
        console.error(err);
      })
      };
  ;

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
                    { products.map(product => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  