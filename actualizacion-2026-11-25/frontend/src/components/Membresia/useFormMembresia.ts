import { useState } from 'react';
import api from '../../api/axios';

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
        const data: Record<string, FormDataEntryValue> = Object.fromEntries(formData.entries());

        // El backend no tiene campo "plan": lo anteponemos al mensaje para que llegue en el correo.
        if (data.plan) {
            data.mensaje = `[${data.plan}] ${data.mensaje ?? ''}`.trim();
            delete data.plan;
        }

        try {
            await api.post('/membresia/solicitar', data);

            setIsSuccess(true);
            e.currentTarget.reset(); 
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Ocurrió un error al enviar la solicitud.');
            }
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