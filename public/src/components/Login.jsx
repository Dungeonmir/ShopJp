import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "antd";
import axios from 'axios';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const log = (e) => {
        e.preventDefault();
        console.log(user);
        axios.post('http://localhost:3001/api/verifyPassword', { user, password }).then((res) => {
            let isLoggedIn = res.data.isLoggedIn;
            console.log(res.data);
            if (isLoggedIn) {
                localStorage.setItem('password', password);
                localStorage.setItem('user', user);
                localStorage.setItem('idCustomers', res.data.idCustomers);
                window.location.replace(e.target.href)
            }
            else {
                alert('Неверный логин или пароль');
            }

        });
    }
    return (
        <div className="background">
            <div className="center-container" id="loginPage">
                <div className="space-between">
                    <div className="center-container">
                        <h2 className="japanese">Магазин азиатских товаров</h2>
                        <h1 className="japanese font50px" id="shopName">JIPISHOP</h1>
                    </div>
                    <div className="center-container" id="loginForm">
                        <label htmlFor="user" className="japanese">Логин</label>
                        <input type="text" name="user" onChange={(e) => {
                            setUser(e.target.value); 
                        }
                        } />
                        <label htmlFor="password" className="japanese">Пароль</label>
                        <input type="password" name="password" onChange={(e) => {
                            setPassword(e.target.value); 
                        }
                        } />
                        <br />
                        <a href="/" onClick={log}>Войти</a>

                        <br /><br />
                        <Link to="/register">Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
