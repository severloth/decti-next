import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useHistory para manejar la redirección
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Icon } from '@mui/material';

interface SquareCardProps {
    color: string;
    icon: React.ReactNode;
    texto: string;
}

const SquareCard: React.FC<SquareCardProps> = ({ color, icon, texto }) => {


    return (
        <Box display="flex" justifyContent="center" alignItems="center" margin="20px">
            <Card
                sx={{
                    width: 220,
                    height: 220,
                    borderRadius: 8,
                    border: `2px solid ${color}`,
                    cursor: 'pointer',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s, border-color 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)' // Escala la tarjeta al hacer hover
                    }
                }}
            >
                <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="10px">
                    <Icon style={{ fontSize: '3rem', color: color, marginBottom: '10px' }}>{icon}</Icon>
                    </Box>
                    <Typography variant="h5" style={{ textAlign: 'center', color: '#333', fontSize: '1.5rem' }}>{texto}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default SquareCard;
