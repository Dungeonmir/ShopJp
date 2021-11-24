import {React, useState, useEffect} from 'react'
import { Typography, Button } from 'antd';
import axios from 'axios';
import {server} from './config'
const { Title } = Typography;

function Orders() {
    const [orders, setOrders] = useState([]);
    const [ordersDay, setOrdersDay] = useState([]);
    
    useEffect(() => {
        let idCustomers = localStorage.getItem('idCustomers');
        axios.post(server + '/api/getOrders', { idCustomers }).then((res) => {
            console.log(res.data);
            setOrders(res.data);
        });
    }, [])
    const clickedDay = () =>{
        
        let date = document.getElementById('datePick').value;
        console.log(date);
        
        axios.post(server + '/api/getOrdersDay', { date }).then((res) => {
            setOrdersDay([]);    

            console.log(res.data);
            setOrdersDay(res.data);
            
        });
        


        
        
    }
    function getPrice(){
        let price = 0;
        ordersDay.map((value) => {
        
            price += value.Price;
        })
        return(
            <>{price}</>
        )
        
    }
    return (
        <div>
            <Title level={2} className="heading">
                Заказы
            </Title>

            <div className="center-container">
                <table>
                    <tr className="bold">
                        <td>Номер заказа</td>
                        <td>Название</td>
                        <td>Пользователь</td>
                        <td>Дата заказа</td>
                        <td>Дата доставки</td>
                        <td>Статус заказа</td>

                    </tr>
                    {orders.map((value) => {
                        if (!value.DateOfDelivery) {
                            value.DateOfDelivery = '-'
                        }
                        return (
                            <>
                                <tr>
                                    <td>{value.idOrders}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Username}</td>
                                    <td>{value.DateOfOrder.toString().slice(0,10)}</td>
                                    <td>{value.DateOfDelivery}</td>
                                    <td>{value.Status}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
                <br/><br/>
                <h2>Представить данные о заказах за определенный день. Подсчитать общую сумму за все товары.</h2>
                <div className="space-between-row-400">
                <input type="date" name="" id="datePick" />
                <button onClick={clickedDay} className="btn">Обновить</button>
                </div>
                
                <table>
                    <tr className="bold">
                        <td>Номер продукта</td>
                        <td>Название</td>
                        <td>Пользователь</td>
                        <td>Дата заказа</td>
                        <td>Цена</td>
                        <td>Статус заказа</td>

                    </tr>

                    {ordersDay.map((value) => {
                        
                        if (!value.DateOfDelivery) {
                            value.DateOfDelivery = '-'
                        }
                        return (
                            <>
                                <tr>
                                    <td>{value.idOrders}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Username}</td>
                                    <td>{value.DateOfOrder.toString().slice(0,10)}</td>
                                    <td>{value.Price}</td>
                                    <td>{value.Status}</td>
                                </tr>
                            </>
                        )
                    })}
                </table>
                <h4>Общая сумма заказов = {
                    
                    getPrice()
                    }</h4>
                </div>

        </div>
    )
}

export default Orders
