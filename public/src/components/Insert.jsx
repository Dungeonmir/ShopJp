import { React, useState, useEffect } from 'react'
import { Button } from 'antd'
import axios from 'axios';
import { user } from './config'
import { server } from './config'
console.log(user)

export default function Insert() {
    const [option, setOption] = useState();
    const [productData, setProductData] = useState({});

    
    useEffect(() => {
        productData.typeOfBook = 1;
        selectOption();
    }, [])
    const selectOption = () => {
        let select = document.getElementById('selectOption');
        productData.category = parseInt(select.value); console.log('category: ' + productData.category)
        console.log('select', select.value);
        setOption(select.value);

    }
    const clicked = () => {
        let price = parseInt(document.getElementById('priceInput').value);
        let discount = parseInt(document.getElementById('discountInput').value);
        if (price < discount) {
            alert('Скидка не может быть больше стоимости');
        }
        else {
            axios.post(server + '/api/insertProduct', { productData }).then((res) => {
                setProductData({});
                console.log(res.data);
            });
        }

    }
    return (
        <div className="center-container">
            <div className="padding-top">
                <h2>Добавить продукт</h2>

            </div>
            <div className="space-between-row padding-top">
                <label htmlFor="">Название</label>
                <input type="text" onChange={(e) => { productData.name = e.target.value; console.log(productData) }} />
            </div>
            <div className="space-between-row padding-top">
                <label htmlFor="">Цена</label>
                <input type="number" id="priceInput" onChange={(e) => { productData.price = parseInt(e.target.value); console.log(productData) }} />
            </div>
            <div className="space-between-row padding-top">
                <label htmlFor="">Скидка</label>
                <input type="number" id="discountInput" onChange={(e) => { productData.discount = parseInt(e.target.value); console.log(productData) }} />
            </div>
            <div className="space-between-row padding-top">
                <label htmlFor="">Количесво</label>
                <input type="number" id="quantity" onChange={(e) => { productData.quantity = parseInt(e.target.value); console.log(productData) }} />
            </div>
            <div className="space-between-row padding-top">
                <label htmlFor="">Категория</label>
                <select name="select" id="selectOption" onChange={selectOption}>
                    <option value="1">Бейджик</option>
                    <option value="2">Книга</option>
                    <option value="3">Одежда</option>
                    <option value="4">Конфеты</option>
                </select>
            </div>

            {(option == 1) &&
                (<div className="space-between-row padding-top">
                    <label htmlFor="">Размер</label>
                    <input type="text" onChange={(e) => { productData.badgeSize = parseInt(e.target.value); console.log(productData) }} />
                </div>)
            }
            {
                (option == 2) &&
                (<>
                    <div className="space-between-row padding-top">
                        <label htmlFor="">Тип книги</label>
                        <select name="" id="" 
                        
                        onChange={(e) => { productData.typeOfBook = parseInt(e.target.value); console.log(productData) }}>
                            <option value="1">Книга</option>
                            <option value="2">Манга</option>
                            <option value="3">Ранобэ</option>
                        </select>

                    </div>

                    <div className="space-between-row padding-top">
                        <label htmlFor="">Автор</label>
                        <input type="text" onChange={(e) => { productData.author = e.target.value; console.log(productData) }} />

                    </div>
                    <div className="space-between-row padding-top">
                        <label htmlFor="">Жанр</label>
                        <input type="text" onChange={(e) => { productData.genre = e.target.value; console.log(productData) }} />

                    </div>
                    <div className="space-between-row padding-top">
                        <label htmlFor="">Тип обложки</label>
                        <select name="" id="" onLoad={(e)=>{productData.typeOfCover =  e.target.value}} onChange={(e) => { productData.typeOfCover = e.target.value; console.log(productData) }}>
                            <option value="Твердый переплет">Твердый переплет</option>
                            <option value="Мягкий переплет">Мягкий переплет</option>
                        </select>
                    </div>
                    <div className="space-between-row padding-top">
                        <label htmlFor="">ISBN</label>
                        <input type="text" onChange={(e) => { productData.ISBN = e.target.value; console.log(productData) }} /></div>
                    <div className="space-between-row padding-top">
                        <label htmlFor="">Количество страниц</label>
                        <input type="number" min="1" onChange={(e) => { productData.numberOfPages = e.target.value; console.log(productData) }} /></div>
                    <div className="space-between-row padding-top">
                        <label htmlFor="" min="1">Год публикации</label>
                        <input type="number" onChange={(e) => { productData.yearOfPublishing = e.target.value; console.log(productData) }} /></div>


                </>)
            }
            {
                (option == 3) &&
                (<><div className="space-between-row padding-top">
                    <label htmlFor="">Размер</label>
                    <select name="" id=""></select>
                    <label htmlFor="">Цвет</label>
                    <select name="" id=""></select>
                </div></>)}
            {
                (option == 4) &&
                (<><div className="space-between-row padding-top">
                    <label htmlFor="">Тип сладости</label>
                    <select name="" id=""></select>
                </div></>)
            }
            <div className="padding-top">
                <Button onClick={clicked}>Добавить</Button>
            </div>


        </div>
    )
}