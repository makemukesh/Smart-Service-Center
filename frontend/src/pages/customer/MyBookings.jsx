import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Clock, ChevronRight, Filter, CalendarCheck, X, CreditCard, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => { fetchBookings(); }, [filter]);

    const fetchBookings = async () => {
        try {
            const params = filter ? `?status=${filter}` : '';
            const { data } = await API.get(`/bookings/my${params}`);
            setBookings(data.bookings);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this booking?')) return;
        try {
            await API.put(`/bookings/${id}/cancel`);
            toast.success('Booking cancelled');
            fetchBookings();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Cannot cancel');
        }
    };

    const handlePay = async (bookingId) => {
        try {
            const { data } = await API.post('/payments/create-intent', { bookingId });
            // Demo: auto-confirm
            await API.post('/payments/confirm', { paymentId: data.paymentId });
            toast.success('Payment successful!');
            fetchBookings();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Payment failed');
        }
    };

    const getStatusStyle = (status) => `status-${status}`;

    const statuses = ['', 'pending', 'confirmed', 'in_service', 'completed', 'delivered', 'cancelled'];

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-white">My Bookings</h1>
                        <p className="text-slate-400 text-sm">Track all your service bookings</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-primary/50">
                            {statuses.map(s => (
                                <option key={s} value={s}>{s ? s.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'All Status'}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="glass-card p-12 rounded-2xl text-center">
                        <CalendarCheck className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Bookings Found</h3>
                        <p className="text-slate-400 mb-6">{filter ? 'Try a different filter' : 'Book your first service now'}</p>
                        <Link to="/dashboard/book"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl">
                            Book Service
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((b, i) => (
                            <div key={b._id} className="glass-card rounded-xl p-5 animate-fade-in-up"
                                style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-primary-light" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">
                                                {b.vehicle?.brand} {b.vehicle?.model} — {b.serviceType?.replace(/_/g, ' ')}
                                            </h3>
                                            <p className="text-sm text-slate-400">{b.serviceCenter?.name}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                📅 {new Date(b.scheduledDate).toLocaleDateString()} at {b.scheduledTime}
                                                {b.estimatedCost && ` · 💰 $${b.actualCost || b.estimatedCost}`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${getStatusStyle(b.status)}`}>
                                            {b.status?.replace(/_/g, ' ')}
                                        </span>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {['completed', 'delivered'].includes(b.status) && !b.isPaid && (
                                                <button onClick={() => handlePay(b._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400
                                   hover:bg-emerald-500/20 transition-colors text-xs font-medium">
                                                    <CreditCard className="w-3 h-3" /> Pay
                                                </button>
                                            )}
                                            {b.isPaid && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">✓ Paid</span>
                                            )}
                                            {['pending', 'confirmed'].includes(b.status) && (
                                                <button onClick={() => handleCancel(b._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400
                                   hover:bg-red-500/20 transition-colors text-xs font-medium">
                                                    <X className="w-3 h-3" /> Cancel
                                                </button>
                                            )}
                                            {['completed', 'delivered'].includes(b.status) && (
                                                <Link to={`/dashboard/feedback/${b._id}`}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400
                                   hover:bg-yellow-500/20 transition-colors text-xs font-medium">
                                                    <Star className="w-3 h-3" /> Review
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
