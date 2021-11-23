import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
import {Buy}from '../components';
const {Title} = Typography;

const Homepage = () =>{
    const  [id, setId] = useState('');
    const [products, setProducts] = useState([]);
    let count = 0;
    useEffect(() => {
        axios.get('http://localhost:3001/api/get').then((res)=>{
        console.log(res.data);
        setProducts(res.data);
    });
    }, [count])
    return(
        <>
        
            <Title level={2} className="heading">
            Магазин азиатских товаров
            </Title>
            <div className="center-container">
                <Buy/>
            </div>
            
            <div className="main-container">
                {products.map((value)=>{
                    return (<div className="card">
                        <h2>{value.Name}</h2>
                        <p className="line">{value.Price}</p>  <h4> {value.Price-value.Discount}₽</h4>
                        <p>Осталось всего {value.Quantity} штук</p>
                        <h1 className="japanese">№ {value.idProducts}</h1>
                        </div>
                    )
                })}
                
            </div>

        </>
    )
}
export default Homepage