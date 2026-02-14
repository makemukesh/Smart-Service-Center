import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Building2, Star, MapPin, Phone, Clock, Search, ChevronRight } from 'lucide-react';

const Centers = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const { data } = await API.get('/service-centers');
                setCenters(data.centers);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchCenters();
    }, []);

    const filtered = centers.filter(c => {
        if (!search) return true;
        const term = search.toLowerCase();
        return c.name.toLowerCase().includes(term) || c.address?.city?.toLowerCase().includes(term);
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Service Centers</h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Find trusted service centers near you with verified ratings and transparent pricing
                    </p>
                    <div className="mt-6 max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or city..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:border-primary/50" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white">No Centers Found</h3>
                        <p className="text-slate-400">Try a different search term</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((c, i) => (
                            <div key={c._id}
                                className="glass-card glass-card-hover rounded-2xl overflow-hidden animate-fade-in-up group"
                                style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                                <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-primary-light" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
                                                    <span className="text-yellow-400 font-medium">{c.rating}</span>
                                                    <span className="text-slate-500">({c.totalReviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {c.description && (
                                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                                    )}

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <MapPin className="w-4 h-4 text-slate-500" />
                                            {c.address?.street}, {c.address?.city}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Phone className="w-4 h-4 text-slate-500" />
                                            {c.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Clock className="w-4 h-4 text-slate-500" />
                                            {c.operatingHours?.open} - {c.operatingHours?.close}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {c.servicesOffered?.slice(0, 3).map((s, i) => (
                                            <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary-light text-xs capitalize">
                                                {s.replace(/_/g, ' ')}
                                            </span>
                                        ))}
                                        {c.servicesOffered?.length > 3 && (
                                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-slate-400">
                                                +{c.servicesOffered.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <Link to="/login"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary/10 text-primary-light
                             font-medium text-sm hover:bg-primary/20 transition-all group-hover:bg-primary/20">
                                        Book Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Centers;
