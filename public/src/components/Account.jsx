import React, { useState, useEffect } from 'react';
import { Typography, Button } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import { server } from './config';
const { Title } = Typography;


function Account() {
    const [account, setAccount] = useState([]);
    useEffect(() => {
        let user = localStorage.getItem('user');
        axios.post(server + '/api/getAccount', { user }).then((res) => {
            console.log(res.data);
            setAccount(res.data);
        });
    }, [])
    const signOut = () => {
        localStorage.clear();

    }
    return (
        <div>
            <Title level={2} className="heading">
                Аккаунт
            </Title>
            
            <div className="center-container">

                {account.map((value) => {
                    return (
                        <>
                            <div className="left-container">
                                <div className="space-between-row">
                                    <h2>Пользователь: </h2>
                                    <h2>{value.FirstName}  {value.LastName}</h2>
                                </div>
                                <div className="space-between-row">
                                    <h2>Логин:</h2>
                                    <h2> {value.UserName}</h2>
                                </div>
                                <div className="space-between-row">
                                    <h2>Почта:</h2>
                                    <h2> {value.Email}</h2>
                                </div>
                                <div className="space-between-row">
                                    <h2>Код аккаунта:</h2>
                                    <h2> {value.idCustomers}</h2>
                                </div>
                            </div>

                        </>
                    )
                })}
                <br/>
                <Button onClick={signOut}><a href="/">Выйти из аккаунта</a></Button>

            </div>
        </div>
    )
}

export default Account
