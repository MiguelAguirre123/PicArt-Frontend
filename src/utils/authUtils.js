import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import awsconfig from '../aws-exports'; // Asegúrate de que la ruta sea correcta

// Inicializa el pool de usuarios con la configuración de aws-exports
const poolData = {
    UserPoolId: awsconfig.aws_user_pools_id,
    ClientId: awsconfig.aws_user_pools_web_client_id,
};

const pool = new CognitoUserPool(poolData);

export const signIn = (email, password) => {
    return new Promise((resolve) => {
        const user = new CognitoUser({ Username: email, Pool: pool });
        const authDetails = new AuthenticationDetails({ Username: email, Password: password });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                // Maneja el token de autenticación aquí si es necesario
                console.log('Login successful:', result);
                resolve({ success: true, result });
            },
            onFailure: (err) => {
                let errorMessage = 'Error desconocido';

                // Manejo específico de errores
                switch (err.code) {
                    case 'UserNotFoundException':
                        errorMessage = 'El correo electrónico no está registrado. Verifica tu correo electrónico o regístrate.';
                        break;
                    case 'NotAuthorizedException':
                        errorMessage = 'La contraseña es incorrecta. Verifica tu contraseña y vuelve a intentarlo.';
                        break;
                    case 'UserNotConfirmedException':
                        errorMessage = 'El usuario no está confirmado. Verifica tu correo electrónico para completar la confirmación.';
                        break;
                    default:
                        errorMessage = 'Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.';
                        break;
                }

                resolve({ success: false, error: errorMessage});
            }
        });
    });
};