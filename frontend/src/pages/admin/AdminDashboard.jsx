import { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
    CalendarCheck, DollarSign, Activity, CheckCircle, Clock,
    Users, Building2, BarChart3, TrendingUp
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get('/bookings/stats/dashboard');
                setStats(data.stats);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 text-sm font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const barChartData = {
        labels: stats?.monthlyBookings?.map(m => monthNames[m._id.month - 1]) || [],
        datasets: [{
            label: 'Bookings',
            data: stats?.monthlyBookings?.map(m => m.count) || [],
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            borderColor: 'rgba(99, 102, 241, 0.8)',
            borderWidth: 2,
            borderRadius: 10,
            hoverBackgroundColor: 'rgba(99, 102, 241, 0.7)',
        }]
    };

    const doughnutData = {
        labels: stats?.statusDistribution?.map(s => s._id?.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())) || [],
        datasets: [{
            data: stats?.statusDistribution?.map(s => s.count) || [],
            backgroundColor: [
                'rgba(245, 158, 11, 0.7)', 'rgba(59, 130, 246, 0.7)', 'rgba(139, 92, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)', 'rgba(6, 182, 212, 0.7)', 'rgba(239, 68, 68, 0.7)'
            ],
            borderWidth: 0,
            hoverOffset: 6,
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 10,
            }
        },
        scales: {
            x: {
                ticks: { color: '#475569', font: { size: 12, weight: '500' } },
                grid: { display: false },
                border: { display: false }
            },
            y: {
                ticks: { color: '#475569', font: { size: 11 }, stepSize: 1 },
                grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                border: { display: false }
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font: { size: 11, weight: '500' },
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8,
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 10,
            }
        }
    };

    const statCards = [
        { icon: CalendarCheck, label: 'Total Bookings', value: stats?.totalBookings || 0, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/8' },
        { icon: Clock, label: 'Pending', value: stats?.pendingBookings || 0, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/8' },
        { icon: Activity, label: 'In Service', value: stats?.activeServices || 0, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/8' },
        { icon: CheckCircle, label: 'Completed', value: stats?.completedBookings || 0, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/8' },
        { icon: DollarSign, label: 'Revenue', value: `$${stats?.totalRevenue || 0}`, color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/8' },
    ];

    if (user?.role === 'superadmin') {
        statCards.push(
            { icon: Users, label: 'Total Users', value: stats?.totalUsers || 0, color: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-500/8' },
            { icon: Building2, label: 'Centers', value: stats?.totalServiceCenters || 0, color: 'from-rose-500 to-red-500', bg: 'bg-rose-500/8' }
        );
    }

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="mb-8 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {user?.role === 'superadmin' ? 'System Overview' : 'Service Center Dashboard'}
                        </h1>
                        <p className="text-slate-500 text-sm">Welcome back, {user?.name}. Here's your overview.</p>
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {statCards.map((card, i) => (
                    <div key={i} className="stat-card animate-fade-in-up"
                        style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center
                            shadow-lg shadow-${card.color.split(' ')[0].replace('from-', '')}/20`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-emerald-400/50" />
                        </div>
                        <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 chart-container animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Monthly Bookings</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Booking trends over time</p>
                        </div>
                    </div>
                    <div className="h-72">
                        <Bar data={barChartData} options={barOptions} />
                    </div>
                </div>
                <div className="chart-container animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white">Status Distribution</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Current booking breakdown</p>
                    </div>
                    <div className="h-72 flex items-center justify-center">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
                <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Latest service booking activity</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentBookings?.map((b) => (
                                <tr key={b._id}>
                                    <td>
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                                                <span className="text-[10px] font-bold text-white">{b.customer?.name?.charAt(0)}</span>
                                            </div>
                                            <span className="text-white font-medium">{b.customer?.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-slate-300">{b.vehicle?.brand} {b.vehicle?.model}</td>
                                    <td className="text-slate-300 capitalize">{b.serviceType?.replace(/_/g, ' ')}</td>
                                    <td className="text-slate-400">{new Date(b.scheduledDate).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize status-${b.status}`}>
                                            {b.status?.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {(!stats?.recentBookings || stats.recentBookings.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="text-center text-slate-500 py-8">No bookings found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
