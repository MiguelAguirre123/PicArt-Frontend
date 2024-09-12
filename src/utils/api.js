import axios from 'axios';

const API_URL = 'https://l0qzaxdqkl.execute-api.us-east-2.amazonaws.com/dev'; // Reemplaza con tu URL de API

export const registerUser = async (requestBody) => {
    try {
        // Asegúrate de enviar todos los parámetros necesarios
        const response = await axios.post(`${API_URL}/register`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        // Maneja errores aquí, por ejemplo, mostrando un mensaje al usuario
        throw error;
    }
};

export const confirmEmail = async (requestBody) => {
    try {

        // Enviar solicitud de confirmación al backend
        const response = await axios.post(`${API_URL}/confirm-email`, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        // Maneja errores aquí, por ejemplo, mostrando un mensaje al usuario
        console.error('Error al confirmar el email:', error);
        throw error;
    }
};