export default function getArticles() {
    return fetch('http://127.0.0.1:8000/api/articles').then(response => {
        return response.json();
    }).catch(error => {
        console.error('Error fetching articles:', error);
        throw error;
    });

}