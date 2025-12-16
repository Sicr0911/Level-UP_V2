interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    username: string;
}

const API_URL = 'http://localhost:8080/api/v1';

export const AuthService = {
    
    login: async (credentials: LoginRequest): Promise<boolean> => {
        try {
            console.log("🔵 Intentando login en:", `${API_URL}/login`);
            
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                console.error("🔴 Error credenciales:", response.status);
                return false;
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', credentials.username);
                return true;
            }

            return false;
        } catch (error) {
            console.error("🔴 Error de conexión:", error);
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/'; 
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};