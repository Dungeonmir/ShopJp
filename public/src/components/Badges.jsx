import React, { useState, useEffect } from 'react';
import { Typography, Button } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Buy, Delete}from '../components';
import { server } from './config';

const { Title } = Typography;


function Badges() {
    const [badges, setBadge] = useState([]);
    
    useEffect(() => {
        axios.get(server + '/api/getBadges').then((res) => {
            console.log(res.data);
            setBadge(res.data);
        });
    }, [])
    
    return (
        <div>
            <Title level={2} className="heading">
                Бейджики
            </Title>
            <div className="center-container">
                <table>
                    <tr className="bold">
                        <td>Номер продукта</td>
                        <td>Название</td>
                        <td>Старая цена</td>
                        <td>Цена</td>
                        <td>Количество</td>
                        <td>Размер</td>

                    </tr>
                    {badges.map((value) => {
                        return (
                            <>
                                <tr>
                                    <td>{value.idProducts}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Price}</td>
                                    <td>{value.Price - value.Discount}</td>
                                    <td>{value.Quantity}</td>
                                    <td>{value.badgeSize} см</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
                <Buy/>
                <Delete/>
                

            </div>
        </div>
    )
}

export default Badges
