import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import { Car, CalendarCheck, Wrench, Plus, Clock, ChevronRight, Star, Building2 } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [vehicles, setVehicles] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vehiclesRes, bookingsRes] = await Promise.all([
                    API.get('/vehicles'),
                    API.get('/bookings/my')
                ]);
                setVehicles(vehiclesRes.data.vehicles);
                setBookings(bookingsRes.data.bookings);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen pt-16">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 text-sm font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const recentBookings = bookings.slice(0, 5);
    const activeBookings = bookings.filter(b => ['pending', 'confirmed', 'in_service'].includes(b.status));

    return (
        <div className="pt-20 pb-12 px-4 sm:px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Greeting */}
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        Welcome back, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500">Here's your vehicle service overview</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: Car, label: 'Cars', value: vehicles.length, color: 'from-blue-500 to-cyan-500' },
                        { icon: CalendarCheck, label: 'Bookings', value: bookings.length, color: 'from-purple-500 to-pink-500' },
                        { icon: Clock, label: 'Active', value: activeBookings.length, color: 'from-amber-500 to-orange-500' },
                        { icon: Star, label: 'Completed', value: bookings.filter(b => b.status === 'completed' || b.status === 'delivered').length, color: 'from-emerald-500 to-teal-500' },
                    ].map((s, i) => (
                        <div key={i} className="stat-card animate-fade-in-up" style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                                <s.icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-2xl font-bold text-white">{s.value}</p>
                            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { to: '/dashboard/book', icon: Wrench, label: 'Book Service', desc: 'Schedule a new service', color: 'from-primary to-secondary' },
                        { to: '/dashboard/vehicles', icon: Car, label: 'My Cars', desc: 'Manage your cars', color: 'from-emerald-500 to-teal-500' },
                        { to: '/dashboard/bookings', icon: CalendarCheck, label: 'My Bookings', desc: 'Track your bookings', color: 'from-amber-500 to-orange-500' },
                    ].map((action, i) => (
                        <Link key={i} to={action.to}
                            className="glass-card glass-card-hover p-5 rounded-2xl flex items-center gap-4 group animate-fade-in-up"
                            style={{ opacity: 0, animationDelay: `${(i + 4) * 0.08}s` }}>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0
                            group-hover:scale-110 transition-transform duration-300`}>
                                <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white text-sm">{action.label}</h3>
                                <p className="text-xs text-slate-500">{action.desc}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-6">
                    {/* Recent Bookings */}
                    <div className="lg:col-span-3 glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
                        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                            <h3 className="font-semibold text-white">Recent Bookings</h3>
                            <Link to="/dashboard/bookings" className="text-xs text-primary-light hover:text-primary font-medium">View All →</Link>
                        </div>
                        {recentBookings.length > 0 ? (
                            <div className="divide-y divide-white/[0.04]">
                                {recentBookings.map((b) => (
                                    <div key={b._id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Wrench className="w-4 h-4 text-primary-light" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-white truncate capitalize">{b.serviceType?.replace(/_/g, ' ')}</p>
                                                <p className="text-[11px] text-slate-500">{b.vehicle?.brand} {b.vehicle?.model} · {new Date(b.scheduledDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium capitalize status-${b.status} flex-shrink-0 ml-2`}>
                                            {b.status?.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <CalendarCheck className="w-10 h-10 mx-auto text-slate-700 mb-3" />
                                <p className="text-slate-500 text-sm">No bookings yet</p>
                                <Link to="/dashboard/book" className="text-primary-light text-xs font-medium mt-1 block">Book your first service →</Link>
                            </div>
                        )}
                    </div>

                    {/* Vehicles */}
                    <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.6s' }}>
                        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                            <h3 className="font-semibold text-white">My Cars</h3>
                            <Link to="/dashboard/vehicles" className="text-xs text-primary-light hover:text-primary font-medium">Manage →</Link>
                        </div>
                        {vehicles.length > 0 ? (
                            <div className="divide-y divide-white/[0.04]">
                                {vehicles.slice(0, 4).map((v) => (
                                    <div key={v._id} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                <Car className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{v.brand} {v.model}</p>
                                                <p className="text-[11px] text-slate-500">{v.registrationNumber}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-400">{v.registrationNumber}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Car className="w-10 h-10 mx-auto text-slate-700 mb-3" />
                                <p className="text-slate-500 text-sm">No cars added</p>
                                <Link to="/dashboard/vehicles" className="text-primary-light text-xs font-medium mt-1 block">Add a car →</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
