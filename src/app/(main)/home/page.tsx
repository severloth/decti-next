'use client'

import React, { useState, useEffect } from 'react';
import { getUser } from '../../../service/auth/api.getUser';
import UserHome from '../../components/home/UserHome';
import SquareCard from '../../components/home/SquareCards';
import { FaNewspaper, FaChalkboardTeacher, FaUserTie, FaBuilding, FaSchool, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import Link from 'next/link';
import Loader from '../../loader';


interface User {
    id: string;
    name: string;
    email: string;
    // Añade otras propiedades del usuario según tu API
}

const HomePage: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null); // Tipo de estado User | null

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró token de autenticación.');
            return;
        }
        const fetchUser = async () => {
            try {
                const userData = await getUser(token);
                setUser(userData);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        loading ? (
            <Loader />
        ) : (
            <div>
                {user && (
                    <div>
                        <UserHome nombreUsuario={user.name} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                            <Link href='/articulos'><SquareCard color="#ff6347" icon={<FaNewspaper />} texto="Articulos" /></Link>
                            <Link href='/cursos'><SquareCard color="#4682b4" icon={<FaChalkboardTeacher />} texto="Cursos" /></Link>
                            <Link href='/freelancers'><SquareCard color="#32cd32" icon={<FaUserTie />} texto="Freelancers registrados" /></Link>
                            <Link href='/empresas'><SquareCard color="#ff7f50" icon={<FaBuilding />} texto="Empresas registradas" /></Link>
                            <Link href='/escuelas'><SquareCard color="#6a5acd" icon={<FaSchool />} texto="Escuelas Hackaton" /></Link>
                            <Link href='/reservar'><SquareCard color="#ffa500" icon={<FaCalendarAlt />} texto="Reservar espacios" /></Link>
                            <Link href='/reservas'><SquareCard color="#8a2be2" icon={<FaClipboardList />} texto="Reservas existentes" /></Link>
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default HomePage;
