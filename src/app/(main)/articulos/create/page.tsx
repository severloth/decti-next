'use client'
import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Snackbar, Grid, Typography, Container, AlertColor } from '@mui/material';
import { Alert } from '@mui/material';
import Loader from '../../../loader';

const CreateArticle = () => {
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null); const [slug, setSlug] = useState('');
    const [caption, setCaption] = useState('');
    const [content, setContent] = useState('');
    const [caption2, setCaption2] = useState('');
    const [content2, setContent2] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Agregado

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCreate = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('topic', topic);
            formData.append('title', title);
            formData.append('description', description);
            if (image) formData.append('image', image);
            formData.append('slug', slug);
            formData.append('caption', caption);
            formData.append('content', content);
            if (image2) formData.append('image2', image2);
            formData.append('caption2', caption2);
            formData.append('content2', content2);

            const response = await fetch('http://127.0.0.1:8000/api/articles', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSnackbarSeverity('success'); // Cambiado
                setSnackbarMessage('Artículo creado exitosamente');
                setSnackbarOpen(true);
                window.location.href = '/articulos';
            } else {
                setSnackbarSeverity('error'); // Cambiado
                setSnackbarMessage('Error al crear el artículo');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error creating article:', error);
            setSnackbarSeverity('error'); // Cambiado
            setSnackbarMessage('Error al crear el artículo');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Verificar si e.target.files es null o undefined
        if (file) {
            setImage(file);
        }
    };

    const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Verificar si e.target.files es null o undefined
        if (file) {
            setImage2(file);
        }
    };


    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Crear Artículo
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Tema" value={topic} onChange={(e) => setTopic(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="file" label="Imagen" onChange={handleImageChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Pie de Foto" value={caption} onChange={(e) => setCaption(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contenido" value={content} onChange={(e) => setContent(e.target.value)} fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="file" label="Imagen2" onChange={handleImage2Change} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Pie de Foto2" value={caption2} onChange={(e) => setCaption2(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contenido2" value={content2} onChange={(e) => setContent2(e.target.value)} fullWidth multiline rows={4} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}
                        disabled={loading}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity as AlertColor}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateArticle;
