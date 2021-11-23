import { React, useState, useEffect } from 'react'
import { Typography, Button } from 'antd';
import axios from 'axios';


const { Title } = Typography;

function Statistic() {
    
    const [stats, setStats] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3001/api/statistic').then((res) => {
            console.log(res.data);
            setStats(res.data);
        });
    }, [])

    const clicked = () =>{
        
        let date = document.getElementById('datePick').value;
        date = date.slice(5,8);
        console.log('date = '+date);
        
        axios.post('http://localhost:3001/api/getStatsDay', { date }).then((res) => {
            setStats([]);    

            console.log(res.data);
            setStats(res.data);
            
        });
    }
    return (
        <div>
            <Title level={2} className="heading">
                Статистика
            </Title>
            <div className="center-container">
                <h2>Количество проданных товаров по каждой категории товаров</h2>
                <div className="space-between-row margin">
                    <input type="month" id="datePick" />
                    <button className="btn" onClick={clicked}>Обновить</button>
                </div>
                <table>
                    <tr className="bold">
                        <td>Название категории</td>
                        <td>Продано штук</td>
                    </tr>
                    {stats.map((value) => {
                        return (
                            
                                <tr>
                                    <td>{value.categoryName}</td>
                                    <td>{value.quantity}</td>
                                </tr>
                            
                        )
                    })}
                </table>
            </div>

        </div>
    )
}

export default Statistic
