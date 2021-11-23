import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom'
function Register() {
    const load = (e) => {
        e.preventDefault();
        console.log('clicked');
        let form = document.getElementById('registerForm');
        let psw = document.getElementById('password').value;
        let email = document.getElementById('email').value;
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let user = document.getElementById('user').value;

        var patternUser = /^.{4,50}$/;
        var pattern = /^.{1,50}$/;
        var patternPsw = /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[a-z]).*$/;
        var patternEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        let formIsRight = true;
        if (patternUser.test(user)) {
            if (patternPsw.test(psw)) {
                if (pattern.test(firstName)) {

                }
                else {
                    formIsRight = false;
                    alert("Введите имя");
                }
                if (pattern.test(lastName)) {

                }
                else {
                    formIsRight = false;
                    alert("Введите фамилию");
                }
                if (patternEmail.test(email)) {

                }
                else {
                    formIsRight = false;
                    alert('Неверно введена почта');
                }
            }
            else {
                formIsRight = false;
                alert('Недопустимый пароль');
            }
        }
        else {
            formIsRight = false;
            alert('Недостаточно-длинный логин');
        }

        if (formIsRight) {
            form.submit();
            setTimeout(() => window.location.replace(e.target.href), 1000);
        }




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
                        <form action="http://localhost:3001/api/insertUser" method="post" id="registerForm">
                            <div className="space-between japanese">
                                <div className="space-between-row " >
                                    <label htmlFor="user">Логин</label>
                                    <input type="text" name="user" required id="user" />
                                </div>

                                <div className="space-between-row " >

                                    <label htmlFor="password">Пароль</label>
                                    <input type="password" name="password" id="password" required />
                                </div>
                                <div className="space-between-row " >
                                <p className="label">Требования к паролю: <br/>минимум 8 символов, минимум 1 цифра</p>
                                </div>
                                <div className="space-between-row " >
                                    <label htmlFor="FirstName">Имя</label>
                                    <input type="text" name="FirstName" required id="firstName" />
                                </div>
                                <div className="space-between-row " >
                                    <label htmlFor="LastName">Фамилия</label>
                                    <input type="text" name="LastName" id="lastName" required />
                                </div>
                                <div className="space-between-row " >
                                    <label htmlFor="Email">Почта</label>
                                    <input type="email" name="Email" required id="email" />
                                </div><br />
                                <a href="/" onClick={load} form="" id="linkForm">Зарегистрироваться</a>

                            </div>

                        </form>

                        <br /><br />
                        <Link to="/">Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
