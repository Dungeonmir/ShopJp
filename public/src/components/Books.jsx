import React, { useState, useEffect } from 'react';
import {Typography, Button} from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import {Buy, Delete}from '../components';
const {Title} = Typography;


function Books() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/api/getBooks').then((res)=>{
        console.log(res.data);
        setBooks(res.data);
    });
    }, [])
    return (
        <div>
            <Title level={2} className="heading">
            Книги
            </Title>
            <div className="center-container">
                <table>
                    <tr className="bold">
                        <td>Артикул</td>
                        <td>Название</td>
                        <td>Автор</td>
                        <td>Жанр</td>
                        <td>Тип обложки</td>
                        <td>ISBN</td>
                        <td>Количесво страниц</td>
                        <td>Год издания</td>
                        <td>Старая цена</td>
                        <td>Цена</td>
                        <td>Количество</td>
                            
                    </tr>
            {books.map((value)=>{
                    return (
                        <>
                        <tr>
                            <td>{value.idBook}</td>
                            <td>{value.Name}</td>
                            <td>{value.Author}</td>
                            <td>{value.Genre}</td>
                            <td>{value.TypeOfCover}</td>
                            <td>{value.ISBN}</td>
                            <td>{value.NumberOfPages}</td>
                            <td>{value.YearOfPublishing}</td>
                            <td>{value.Price}</td>
                            <td>{value.Price - value.Discount}</td>
                            <td>{value.Quantity}</td>
                            
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

export default Books
