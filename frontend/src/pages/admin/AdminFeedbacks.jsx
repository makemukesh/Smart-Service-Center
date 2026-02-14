import { useState, useEffect } from 'react';
import API from '../../services/api';
import { Star, MessageCircle, Send, User } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [responseText, setResponseText] = useState({});
    const [responding, setResponding] = useState(null);

    useEffect(() => { fetchFeedbacks(); }, []);

    const fetchFeedbacks = async () => {
        try {
            const { data } = await API.get('/feedbacks');
            setFeedbacks(data.feedbacks);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleRespond = async (id) => {
        if (!responseText[id]?.trim()) return;
        try {
            await API.put(`/feedbacks/${id}/respond`, { response: responseText[id] });
            toast.success('Response submitted');
            setResponseText({ ...responseText, [id]: '' });
            setResponding(null);
            fetchFeedbacks();
        } catch (err) {
            toast.error('Failed to respond');
        }
    };

    const renderStars = (rating) => (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
            ))}
            <span className="text-xs text-slate-400 ml-1.5 font-medium">{rating}/5</span>
        </div>
    );

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Customer Feedback</h1>
                    <p className="text-slate-500 text-sm">View and respond to customer reviews</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : feedbacks.length === 0 ? (
                <div className="text-center py-20">
                    <MessageCircle className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-1">No Feedback Yet</h3>
                    <p className="text-slate-500">Feedback will appear here when customers submit reviews.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {feedbacks.map((fb, i) => (
                        <div key={fb._id}
                            className="glass-card rounded-2xl overflow-hidden animate-fade-in-up"
                            style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold text-white">{fb.customer?.name?.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{fb.customer?.name}</p>
                                            <p className="text-xs text-slate-500">{fb.customer?.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {renderStars(fb.rating?.overall || fb.rating)}
                                        <p className="text-[11px] text-slate-600 mt-1">
                                            {new Date(fb.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Service Info */}
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary-light font-medium capitalize">
                                        {fb.booking?.serviceType?.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-400 font-medium">
                                        {fb.serviceCenter?.name || 'Service Center'}
                                    </span>
                                </div>

                                {/* Review */}
                                {fb.review && (
                                    <div className="bg-white/[0.03] rounded-xl p-4 mb-4 border border-white/[0.04]">
                                        <p className="text-sm text-slate-300 leading-relaxed italic">"{fb.review}"</p>
                                    </div>
                                )}

                                {/* Rating breakdown */}
                                {fb.rating && typeof fb.rating === 'object' && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                        {Object.entries(fb.rating).filter(([k]) => k !== 'overall').map(([key, val]) => (
                                            <div key={key} className="bg-white/[0.03] rounded-lg p-3 text-center">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 capitalize">{key}</p>
                                                <div className="flex items-center justify-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-sm font-semibold text-white">{val}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Admin Response */}
                                {fb.response ? (
                                    <div className="bg-primary/[0.06] rounded-xl p-4 border border-primary/[0.1]">
                                        <p className="text-xs text-primary-light font-semibold mb-1 flex items-center gap-1">
                                            <User className="w-3 h-3" /> Admin Response
                                        </p>
                                        <p className="text-sm text-slate-300">{fb.response}</p>
                                    </div>
                                ) : (
                                    <div>
                                        {responding === fb._id ? (
                                            <div className="flex gap-2">
                                                <input type="text"
                                                    value={responseText[fb._id] || ''}
                                                    onChange={(e) => setResponseText({ ...responseText, [fb._id]: e.target.value })}
                                                    placeholder="Type your response..."
                                                    className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                                   placeholder-slate-600 focus:border-primary/40"
                                                    onKeyDown={(e) => e.key === 'Enter' && handleRespond(fb._id)} />
                                                <button onClick={() => handleRespond(fb._id)}
                                                    className="px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium
                                   hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-1.5">
                                                    <Send className="w-3.5 h-3.5" /> Send
                                                </button>
                                                <button onClick={() => setResponding(null)}
                                                    className="px-3 py-2.5 bg-white/[0.04] text-slate-400 rounded-xl text-sm hover:bg-white/[0.08] transition-all">
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setResponding(fb._id)}
                                                className="px-4 py-2 text-sm font-medium text-primary-light bg-primary/10 rounded-xl
                                 hover:bg-primary/20 transition-all duration-200 flex items-center gap-1.5">
                                                <MessageCircle className="w-3.5 h-3.5" /> Respond
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminFeedbacks;
