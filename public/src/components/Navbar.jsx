import React from 'react'
import { Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BookOutlined, DingtalkOutlined, SmileOutlined,PlusOutlined, PropertySafetyOutlined, UserOutlined, ShoppingOutlined,SettingOutlined } from '@ant-design/icons';
const { Title } = Typography;

function Navbar() {
    return (<>
        <div className="nav-container">
            <Menu theme='light'>
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Главная</Link>
                </Menu.Item>
                <Menu.Item icon={<BookOutlined />}>
                    <Link to="/books">Книги</Link>
                </Menu.Item>
                <Menu.Item icon={<DingtalkOutlined />}>
                    <Link to="/clothes">Одежда</Link>
                </Menu.Item>
                <Menu.Item icon={<SmileOutlined />}>
                    <Link to="/sweets">Сладости</Link>
                </Menu.Item>
                <Menu.Item icon={<PropertySafetyOutlined />}>
                    <Link to="/badges">Бейджи</Link>
                </Menu.Item>
            </Menu>

        </div>
        <div className="nav-container">
            <Menu theme='light'>
                <Menu.Item icon={<PlusOutlined />}>
                <Link to="/insert">Добавить продукт</Link>
                </Menu.Item>
                <Menu.Item icon={<SettingOutlined />}>
                    <Link to="/statistic">Статистика</Link>
                </Menu.Item>
                <Menu.Item icon={<ShoppingOutlined />}>
                    <Link to="/orders">Заказы</Link>
                </Menu.Item>
                <Menu.Item icon={<UserOutlined />}>

                    <Link to="/account">Аккаунт</Link>
                </Menu.Item>
            </Menu>
        </div>
    </>
    )
}

export default Navbar
