'use client'
import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, IconButton } from '@mui/material';
import { login } from '../../../service/auth/api.login';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setLoginError(false);
    setLoginSuccess(false);

    try {
      if (username === '' || password === '') throw new Error('Debe ingresar credenciales válidas.');
      const response = await login(username, password);
      if (response.error) {
        setLoginError(true);
        setSnackbarOpen(true);
      } else {
        setLoginSuccess(true);
        setSnackbarOpen(true);
        localStorage.setItem('token', response.token);
        window.location.href = '/home';
      }
    } catch (error) {
      console.error(error);
      setLoginError(true);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#00627E', color: 'white', flexDirection: 'column' }}>
      <Image src="/logoBlanco.png" alt="logo" width={100} height={100} style={{ float: 'left' }} />
      <div style={{ width: '40%', minWidth: '300px', minHeight: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '30px', fontWeight: 'bold' }}>Bienvenido a la UTEC</h1>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f2f2f2', // Cambiado a un blanco ligeramente atenuado
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.8)', // Ajustado el valor de la sombra
          height: '400px',
          width: '100%',
          justifyContent: 'center'
        }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px', fontWeight: 'bold', color:'#00627e' }}>Iniciar Sesión</h2>
          <TextField
            label="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: '20px', width: '80%' }}
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '20px', width: '80%' }}
          />
          <Button
            onClick={handleLogin}
            disabled={loading}
            variant="contained"
            color={loginSuccess ? 'success' : 'primary'}
            style={{ width: '80%', marginBottom: '20px', position: 'relative', height: '40px', backgroundColor: '#00627e'}}
          >
            {loading && <CircularProgress size={24} style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px' }} />}
            {!loading && (loginSuccess ? 'Inicio de sesión exitoso' : 'Iniciar Sesión')}
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message={loginSuccess ? 'Inicio de sesión exitoso' : 'Credenciales incorrectas'}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            action={
              <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
                {loginSuccess ? <CheckCircleIcon /> : <ErrorIcon />}
              </IconButton>
            }
            sx={{ backgroundColor: loginSuccess ? '#4caf50' : '#f44336' }}
          />
          <Link href="/register" style={{color:'gray'}}>¿No tienes una cuenta? Regístrate aquí</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
