export default async function getArticle({ slug }: { slug: string }) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/articles/${slug}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
}