import {React, useState} from 'react'
import axios from 'axios';
import {Button} from 'antd';
import { server } from './config';
function Buy() {
    const [productId, setProductId] = useState('');
    const clickedToBuy = () =>{
        let idCustomers = localStorage.getItem('idCustomers');
        axios.post(server + '/api/buy', {productId, idCustomers }).then((res)=>{
            if (res.data=='idProduct error') {
                alert('Неверный номер продукта');
            }
            if (res.data=='EmptyStorage') {
                alert('Товара закончился');
            }
            if (res.data=='done') {
                window.location.reload();
            }
        })
        
    }
    return (
        <div className="space-between-row padding-top">
            <label htmlFor="productId" className>Номер продукта<br/> для покупки</label>
            <input type="number" name="productId" min="1" placeholder="1" onChange={(e) => {
                setProductId(e.target.value);
            }} />
            <Button onClick={clickedToBuy}>Купить</Button>
        </div>
    )
}

export default Buy
