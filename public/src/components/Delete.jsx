import {React, useState} from 'react'
import axios from 'axios';
import {Button} from 'antd';
function Delete() {
    const [productId, setProductId] = useState('');
    const clickedToDelete = () =>{
        axios.post('http://localhost:3001/api/delete', {productId}).then((res)=>{
            
        })
        
    }
    return (
        <div className="space-between-row padding-top">
            <label htmlFor="productId" className>Номер продукта<br/> для удаления</label>
            <input type="number" name="productId" min="1" placeholder="1" onChange={(e) => {
                setProductId(e.target.value);
            }} />
            <Button onClick={clickedToDelete}>Удалить</Button>
        </div>
    )
}

export default Delete
