import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { Star, Send, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Feedback = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        rating: 5, review: '', serviceQuality: 5, valueForMoney: 4, timeliness: 4
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/feedbacks', { bookingId, ...form });
            toast.success('Feedback submitted!');
            navigate('/dashboard/bookings');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    const StarRating = ({ value, onChange, label }) => (
        <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">{label}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button"
                        onClick={() => onChange(star)}
                        className={`p-0.5 transition-all ${star <= value ? 'text-yellow-400 scale-110' : 'text-slate-600 hover:text-yellow-300'}`}>
                        <Star className="w-5 h-5" fill={star <= value ? 'currentColor' : 'none'} />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
                <button onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center mb-3">
                            <Star className="w-8 h-8 text-yellow-400" />
                        </div>
                        <h1 className="text-xl font-bold text-white">Rate Your Experience</h1>
                        <p className="text-sm text-slate-400 mt-1">Your feedback helps us improve</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3 p-4 rounded-xl bg-white/5">
                            <StarRating label="Overall Rating" value={form.rating}
                                onChange={(v) => setForm({ ...form, rating: v })} />
                            <StarRating label="Service Quality" value={form.serviceQuality}
                                onChange={(v) => setForm({ ...form, serviceQuality: v })} />
                            <StarRating label="Value for Money" value={form.valueForMoney}
                                onChange={(v) => setForm({ ...form, valueForMoney: v })} />
                            <StarRating label="Timeliness" value={form.timeliness}
                                onChange={(v) => setForm({ ...form, timeliness: v })} />
                        </div>

                        <div>
                            <label className="block text-sm text-slate-300 mb-1.5">Your Review</label>
                            <textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                                rows="4" placeholder="Share your experience..."
                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500
                         focus:border-primary/50 resize-none" />
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl
                       hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (
                                <><Send className="w-4 h-4" /> Submit Feedback</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
