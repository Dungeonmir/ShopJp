import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
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
    
    
    /*
    const  [id, setId] = useState('');
    const submitPressed = () =>{
        console.log(id);
        axios.post('http://localhost:3001/api/insert', {id});
    }*/
    return(
        <>
        
            <Title level={2} className="heading">
            Магазин азиатских товаров
            </Title>
            <div className="main-container">
                {products.map((value)=>{
                    return (<div className="card">
                        <h2>{value.Name}</h2>
                        <p className="line">{value.Price}</p>  <h4> {value.Price-value.Discount}₽</h4>
                        <p>Осталось всего {value.Quantity} штук</p>
                        <div className="btn"><Button type="primary" block>Купить</Button></div>
                        </div>
                    )
                })}
                {/* <label htmlFor="id">ID</label>
                <input type="text" name="id" id="id" onChange={(e)=>{
                    setId(e.target.value);
                }}/>
            <button onClick={submitPressed}>Submit</button>*/}
            </div>

        </>
    )
}

export default Homepage