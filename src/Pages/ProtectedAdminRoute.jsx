import React from 'react'
import { useAuth } from '../Store/auth'

const ProtectedAdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div className="text-white">Loading...</div>;

    if (!user || !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedAdminRoute
