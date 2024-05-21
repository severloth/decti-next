'use client'
import React, { useState, useEffect } from 'react';
import { IconButton, Button } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Loader from '../../../loader';
import styles from './Article.module.css';
import Image from 'next/image';
import getArticle from '@/service/articles/api.getArticleBySlug';
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

const ArticlePage = () => {
    const pathname = window.location.pathname;
    const slug = pathname.split('/articulos/')[1];
    const [article, setArticle] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
    const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const articleData = await getArticle({ slug });
                setArticle(articleData);
                setLoading(false);
            } catch (error) {
                window.location.href = '/home'; // Redirige a la página de inicio en caso de error
                console.error('Error fetching article:', error);
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);


    const handleEditArticle = async (slug: string) => {
        // Implementa la lógica para editar un artículo
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

    const deleteArticle = async (slug: string) => {
        setLoadingDelete(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/articles/${slug}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting article');
            }
            window.location.href = '/articulos'; // Redirige a la página de inicio en caso de éxito
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        loading ? <Loader /> : (
            <div className={styles.main}>
                <div className={styles.header}>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDeleteArticle(article.slug)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEditArticle(article.slug)}>
                        <EditIcon />
                    </IconButton>
                </div>
                <Button onClick={() => window.location.href = '/articulos'} variant="outlined" style={{ marginLeft: '0px', marginTop: '20px' }}>
                    Volver a los artículos
                </Button>
                <div className={styles.content}>
                    <div className={styles.topic}>
                        <i>{article.topic}</i>
                    </div>
                    <div className={styles.title}>
                        <strong>{article.title}</strong>
                    </div>
                    <div className={styles.description}>
                        <p className={styles.descriptionText}>{article.description}</p>
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={`http://127.0.0.1:8000${article.image}`}
                            alt={`Imagen del artículo ${article.title}`}
                            width={500}
                            height={300}
                        />
                        <p className={styles.caption}>{article.caption}</p>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.contentText}>{article.content}</p>
                    </div>
                    {article.image2 && (
                        <div className={styles.image}>
                            <Image
                                src={`http://127.0.0.1:8000${article.image2}`}
                                alt={`Imagen del artículo ${article.title}`}
                                width={500}
                                height={500}
                            />
                            <p className={styles.caption}>{article.caption2}</p>
                        </div>
                    )}
                    {article.content2 && (
                        <div className={styles.content}>
                            <p className={styles.contentText}>{article.content2}</p>
                        </div>
                    )}
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
            </div>
            
        )
    );
}

export default ArticlePage;
