import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Buy, Delete}from '../components';
const {Title} = Typography;


function Clothes() {
    const [clothes, setClothes] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/getClothes').then((res)=>{
        console.log(res.data);
        setClothes(res.data);
    });
    }, [])
    return (
        <div>
            <Title level={2} className="heading">
            Одежда
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
                        <td>Цвет</td>
                        <td>Размер</td>
                            
                    </tr>
            {clothes.map((value)=>{
                    return (
                        <>
                        <tr>
                            <td>{value.idProducts}</td>
                            <td>{value.Name}</td>
                            <td>{value.Price}</td>
                            <td>{value.Price - value.Discount}</td>
                            <td>{value.Quantity}</td>
                            <td>{value.Type}</td>
                            <td>{value.Colors}</td>
                            <td>{value.Size}</td>
                        </tr>
                        </>
                    )
                })}
                </table>
                <Buy/>
            </div>
        </div>
    )
}

export default Clothes
