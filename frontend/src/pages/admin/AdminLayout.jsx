import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user } = useAuth();
    const [sidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-transparent">
            <Sidebar role={user?.role === 'superadmin' ? 'superadmin' : 'admin'} />
            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-[68px]' : 'ml-[260px]'}`}>
                <div className="min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
