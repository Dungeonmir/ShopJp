import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
const {Title} = Typography;


function Sweets() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/getSweets').then((res)=>{
        console.log(res.data);
        setBooks(res.data);
    });
    }, [])
    return (
        <div>
            <Title level={2} className="heading">
            Сладости
            </Title>
            <div className="center-container">
                <table>
                    <tr className="bold">
                        <td>Номер продукта</td>
                        <td>Название</td>
                        <td>Старая цена</td>
                        <td>Цена</td>
                        <td>Количество</td>
                        <td>Тип</td>
                            
                    </tr>
            {books.map((value)=>{
                    return (
                        <>
                        <tr>
                            <td>{value.idProducts}</td>
                            <td>{value.Name}</td>
                            <td>{value.Price}</td>
                            <td>{value.Price - value.Discount}</td>
                            <td>{value.Quantity}</td>
                            <td>{value.SweetType}</td>
                        </tr>
                        </>
                    )
                })}
                </table>
            </div>
        </div>
    )
}

export default Sweets
