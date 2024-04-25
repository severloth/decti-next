export const getUser = async (token: string) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return { error: 'Get user failed' };
        }

        return response.json();

    } catch (error) {
        console.error(error);
    }

}