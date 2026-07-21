import { useState } from 'react';

export const useFormMembresia = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSuccess(false);
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/membresia/solicitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                e.currentTarget.reset(); 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ocurrió un error al enviar la solicitud.');
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage('Error de conexión con el servidor.',);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setErrorMessage('');
    };

    return { isLoading, isSuccess, errorMessage, handleSubmit, resetForm };
};