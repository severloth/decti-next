'use client'
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Snackbar, SnackbarContent } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../loader';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
    id: number;
    topic: string;
    title: string;
    description: string;
    slug: string;
    image: string;
    // Agrega más propiedades si es necesario
}

const fetchArticles = async (): Promise<Article[]> => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/articles');
        const articles: Article[] = await response.json();
        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

const Articulos: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [articles, setArticles] = useState<Article[]>([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
    const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const articlesData: Article[] = await fetchArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    const deleteArticle = async (slug: string) => {
        setLoadingDelete(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/articles/${slug}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting article');
            }
            setArticles(prevArticles => prevArticles.filter(article => article.slug !== slug));
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleDeleteArticle = (slug: string) => {
        setSelectedArticleSlug(slug);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        if (!selectedArticleSlug) return;
        setLoadingDelete(true);
        try {
            await deleteArticle(selectedArticleSlug);
            setDeleteConfirmationOpen(false);
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setLoadingDelete(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {loading ? <Loader /> :
                <div style={{ textAlign: 'start', marginTop: '2rem', margin: '60px' }}>
                    <Link href='/articulos/create' style={{float:'right', padding:'20px', backgroundColor:'#00627e', borderRadius:'20px', color:'white'}}>
                        Crear Artículo Nuevo
                    </Link>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Artículos</h1>

                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Aquí podrás revisar, editar o crear artículos.
                    </Typography>

                    <div style={{ width: '80%', margin: '0 auto', marginTop: '2rem' }}>
                        <Grid container spacing={3} justifyContent="center">
                            {articles.map((article) => (
                                <Grid key={article.id} item xs={12} sm={6} md={4}>
                                    <Card sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                        borderRadius: 10,
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': { transform: 'scale(1.05)' }
                                    }}>
                                        <CardActionArea component="a" href={`/articulos/${article.slug}`}>
                                            <div style={{
                                                width: '100%',
                                                height: 200,
                                                position: 'relative', // Para posicionar correctamente el contenido sobre la imagen
                                                borderRadius: '10px', // Borde redondeado en toda la tarjeta
                                                overflow: 'hidden', // Oculta cualquier parte de la imagen que se extienda más allá de la tarjeta
                                            }}>
                                                <Image
                                                    src={`http://127.0.0.1:8000${article.image}`}
                                                    alt={`Imagen del artículo ${article.title}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <CardContent style={{ textAlign: 'center', flexGrow: 1, marginTop: '1rem' }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {article.topic}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {article.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteArticle(article.slug)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation} maxWidth="xs">
                        <DialogTitle style={{ backgroundColor: '#00627e', color: '#fff', padding: '20px', borderRadius: '0px', marginBottom: '20px' }}>¿Seguro que desea borrar?</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Esta acción no se puede deshacer.
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button onClick={handleCloseDeleteConfirmation} style={{ color: '#00627e' }}>
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirmDelete} color="primary" variant="contained" style={{ backgroundColor: 'red', color: '#fff', padding: '10px' }}>
                                {loadingDelete ? <CircularProgress size={24} color="inherit" /> : 'Confirmar'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <SnackbarContent
                    message={
                        <Typography style={{ display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutline style={{ marginRight: '8px', color: '#43a047' }} />
                            Artículo eliminado con éxito.
                        </Typography>
                    }
                    style={{ backgroundColor: '#fff', color: '#000' }}
                />
            </Snackbar>
        </>
    );
}

export default Articulos;
