import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, CalendarCheck, Users, Building2, Star,
    CreditCard, LogOut, Car, ChevronLeft, ChevronRight, BarChart3
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ role = 'admin', onCollapse }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        const next = !collapsed;
        setCollapsed(next);
        onCollapse?.(next);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const adminLinks = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
        { to: '/admin/feedbacks', icon: Star, label: 'Feedbacks' },
        { to: '/admin/center', icon: Building2, label: 'My Center' },
    ];

    const superAdminLinks = [
        { to: '/superadmin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/superadmin/bookings', icon: CalendarCheck, label: 'All Bookings' },
        { to: '/superadmin/centers', icon: Building2, label: 'Service Centers' },
        { to: '/superadmin/users', icon: Users, label: 'Users' },
        { to: '/superadmin/payments', icon: CreditCard, label: 'Payments' },
        { to: '/superadmin/analytics', icon: BarChart3, label: 'Analytics' },
    ];

    const links = role === 'superadmin' ? superAdminLinks : adminLinks;

    return (
        <aside className={`admin-sidebar transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>
            <div className="flex flex-col h-full">
                {/* Brand Header */}
                <div className={`flex items-center h-16 border-b border-white/[0.06] px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center
                        shadow-lg shadow-primary/20 flex-shrink-0">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="animate-fade-in-up">
                            <span className="text-base font-bold gradient-text tracking-tight">SmartService</span>
                            <p className="text-[10px] text-slate-500 -mt-0.5 font-medium capitalize">{role} Panel</p>
                        </div>
                    )}
                </div>

                {/* User info */}
                {!collapsed && (
                    <div className="px-4 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04]">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center
                            ring-2 ring-primary/20 flex-shrink-0">
                                <span className="text-xs font-bold text-white">{user?.name?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                <p className="text-[10px] text-slate-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toggle */}
                <button onClick={handleCollapse}
                    className="absolute -right-3.5 top-[72px] w-7 h-7 rounded-full bg-[#1e293b] border border-white/10 text-slate-400
                   flex items-center justify-center shadow-lg hover:text-white hover:border-primary/40 hover:bg-primary/20
                   transition-all duration-200 z-10">
                    {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                </button>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {!collapsed && (
                        <p className="px-3 mb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Navigation</p>
                    )}
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                ${isActive
                                    ? 'bg-gradient-to-r from-primary/20 to-primary/[0.08] text-white border border-primary/25 shadow-lg shadow-primary/5'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                                } ${collapsed ? 'justify-center px-0' : ''}`
                            }
                        >
                            <link.icon className="w-[18px] h-[18px] flex-shrink-0" />
                            {!collapsed && <span>{link.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-3 border-t border-white/[0.06]">
                    <button onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium
                      text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200
                      ${collapsed ? 'justify-center px-0' : ''}`}>
                        <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
