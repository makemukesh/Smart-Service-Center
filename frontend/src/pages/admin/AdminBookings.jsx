import { useState, useEffect } from 'react';
import API from '../../services/api';
import { CalendarCheck, Search, RefreshCw, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUSES = ['pending', 'confirmed', 'in_service', 'completed', 'delivered', 'cancelled'];

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => { fetchBookings(); }, [filter]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const params = filter ? `?status=${filter}` : '';
            const { data } = await API.get(`/bookings${params}`);
            setBookings(data.bookings);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/bookings/${id}/status`, { status });
            toast.success(`Status updated to ${status.replace(/_/g, ' ')}`);
            fetchBookings();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const filteredBookings = bookings.filter(b => {
        if (!search) return true;
        const term = search.toLowerCase();
        return b.customer?.name?.toLowerCase().includes(term) ||
            b.vehicle?.brand?.toLowerCase().includes(term) ||
            b.vehicle?.model?.toLowerCase().includes(term);
    });

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <CalendarCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Bookings</h1>
                        <p className="text-slate-500 text-sm">View and update all service bookings</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                       placeholder-slate-600 focus:border-primary/40 w-52" />
                    </div>
                    {/* Filter */}
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40 cursor-pointer">
                        <option value="">All Status</option>
                        {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</option>)}
                    </select>
                    {/* Refresh */}
                    <button onClick={fetchBookings}
                        className="p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.08]
                     transition-all duration-200">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Service</th>
                                    <th>Scheduled</th>
                                    <th>Cost</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-[10px] font-bold text-white">{b.customer?.name?.charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{b.customer?.name}</p>
                                                    <p className="text-[11px] text-slate-500">{b.customer?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-sm text-white">{b.vehicle?.brand} {b.vehicle?.model}</p>
                                            <p className="text-[11px] text-slate-500">{b.vehicle?.registrationNumber}</p>
                                        </td>
                                        <td className="text-sm text-slate-300 capitalize">{b.serviceType?.replace(/_/g, ' ')}</td>
                                        <td>
                                            <p className="text-sm text-white">{new Date(b.scheduledDate).toLocaleDateString()}</p>
                                            <p className="text-[11px] text-slate-500">{b.scheduledTime}</p>
                                        </td>
                                        <td className="text-sm font-semibold text-emerald-400">${b.actualCost || b.estimatedCost}</td>
                                        <td>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${b.isPaid ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                                                {b.isPaid ? '✓ Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize status-${b.status}`}>
                                                {b.status?.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td>
                                            <select value={b.status}
                                                onChange={(e) => updateStatus(b._id, e.target.value)}
                                                className="px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-white text-xs
                                 focus:border-primary/40 cursor-pointer hover:bg-white/[0.08] transition-all">
                                                {STATUSES.map(s => (
                                                    <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBookings.length === 0 && (
                            <div className="text-center py-16">
                                <CalendarCheck className="w-12 h-12 mx-auto text-slate-700 mb-3" />
                                <p className="text-slate-500 font-medium">No bookings found</p>
                                <p className="text-slate-600 text-sm mt-1">Try a different filter or search term</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;
