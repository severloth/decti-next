import React from 'react';
import { Typography } from '@mui/material';
import { FaBell } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import styles from '../../../UserHome.module.css';
interface UserHomeProps {
    nombreUsuario: string;
}

const UserHome: React.FC<UserHomeProps> = ({ nombreUsuario }) => {

    const [notifications, setNotifications] = React.useState([1111]);

    return (
        <div style={{ margin: '60px' }}>
            <IconButton className={notifications.length > 0 ? styles.hasNotifications : styles.hasNotNotifications} style={{float:'right'}}>
                <span className={notifications.length > 0 ? styles.notificationCounter : styles.notNotificationCounter }>{notifications.length}</span>
                <FaBell />
            </IconButton>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Hola, {nombreUsuario}</h1>
            <Typography style={{ fontSize: '16px', color: '#666', float: 'right' }} variant="body1">{new Date().toLocaleDateString()}</Typography>

            <p style={{ fontSize: '16px', color: '#666' }}>Aqui podrás administrar el sistema UTEC</p>
        </div>
    );
}

export default UserHome;