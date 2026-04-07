import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles }: { allowedRoles: number[] }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/loginPage" />;
    
    if (!allowedRoles.includes(user.rol_id)) {
        return <Navigate to="/" />; 
    }

    return <Outlet />;
};