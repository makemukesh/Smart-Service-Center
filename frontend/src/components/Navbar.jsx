import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, LogOut, Menu, X, User, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (!user) return '/login';
        if (user.role === 'superadmin') return '/superadmin';
        if (user.role === 'admin') return '/admin';
        return '/dashboard';
    };

    // Hide main navbar on admin/superadmin pages — sidebar handles nav instead
    const isAdminPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/superadmin');
    if (isAdminPage && user && (user.role === 'admin' || user.role === 'superadmin')) {
        return null;
    }

    const activePath = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`main-navbar transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center
                          shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300
                          group-hover:scale-105">
                            <Car className="w-5 h-5 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-lg font-bold gradient-text tracking-tight">SmartService</span>
                            <p className="text-[10px] text-slate-500 -mt-0.5 font-medium">Vehicle Booking</p>
                        </div>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavItem to="/" active={activePath('/')} label="Home" />
                        <NavItem to="/services" active={activePath('/services')} label="Services" />
                        <NavItem to="/centers" active={activePath('/centers')} label="Centers" />
                        {user && (
                            <NavItem
                                to={getDashboardLink()}
                                active={activePath('/dashboard')}
                                label="Dashboard"
                            />
                        )}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08]
                              hover:bg-white/[0.08] transition-all cursor-default">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center
                                ring-2 ring-primary/20">
                                        <span className="text-[11px] font-bold text-white">{user.name?.charAt(0)?.toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
                                        <p className="text-[10px] text-slate-500 capitalize font-medium">{user.role}</p>
                                    </div>
                                </div>
                                <button onClick={handleLogout}
                                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                    title="Logout">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login"
                                    className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                                    Login
                                </Link>
                                <Link to="/register"
                                    className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white rounded-xl
                           hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/[0.06] bg-[#0a0e1a]/98 backdrop-blur-2xl animate-fade-in-up">
                    <div className="px-4 py-3 space-y-1">
                        <MobileLink to="/" onClick={() => setMobileOpen(false)}>Home</MobileLink>
                        <MobileLink to="/services" onClick={() => setMobileOpen(false)}>Services</MobileLink>
                        <MobileLink to="/centers" onClick={() => setMobileOpen(false)}>Centers</MobileLink>
                        {user ? (
                            <>
                                <MobileLink to={getDashboardLink()} onClick={() => setMobileOpen(false)}>Dashboard</MobileLink>
                                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                                    className="w-full text-left px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <MobileLink to="/login" onClick={() => setMobileOpen(false)}>Login</MobileLink>
                                <MobileLink to="/register" onClick={() => setMobileOpen(false)}>Sign Up</MobileLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

const NavItem = ({ to, active, label }) => (
    <Link to={to}
        className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200
      ${active
                ? 'text-white bg-white/[0.08] shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}>
        {label}
    </Link>
);

const MobileLink = ({ to, onClick, children }) => (
    <Link to={to} onClick={onClick}
        className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all font-medium">
        {children}
    </Link>
);

export default Navbar;
