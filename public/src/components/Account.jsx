import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
const {Title} = Typography;


function Account() {
    const [account, setAccount] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/getAccount').then((res)=>{
        console.log(res.data);
        setAccount(res.data);
    });
    }, [])
    return (
        <div>
            <Title level={2} className="heading">
            Привет, username
            </Title>
            <div className="center-container">
                
            {account.map((value)=>{
                    return (
                        <>
                        <h2>Имя </h2>
                        </>
                    )
                })}

            </div>
        </div>
    )
}

export default Account
