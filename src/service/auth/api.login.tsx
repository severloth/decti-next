export const login = async (username: string, password: string) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            return { error: 'Login failed' };
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
};