import { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Building2, MapPin, Phone, Clock, Wrench, Star, Save, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminCenter = () => {
    const { user } = useAuth();
    const [center, setCenter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});

    useEffect(() => { fetchCenter(); }, []);

    const fetchCenter = async () => {
        try {
            const { data } = await API.get(`/service-centers/${user?.serviceCenterId}`);
            setCenter(data.serviceCenter);
            setForm(data.serviceCenter);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSave = async () => {
        try {
            await API.put(`/service-centers/${center._id}`, form);
            toast.success('Center updated successfully');
            setEditing(false);
            fetchCenter();
        } catch (err) {
            toast.error('Update failed');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!center) {
        return (
            <div className="p-6 lg:p-8 min-h-screen">
                <div className="text-center py-20">
                    <Building2 className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">No Center Assigned</h2>
                    <p className="text-slate-500">You haven't been assigned to a service center yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">My Service Center</h1>
                        <p className="text-slate-500 text-sm">Manage your center details</p>
                    </div>
                </div>
                {!editing ? (
                    <button onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary-light rounded-xl text-sm font-medium
                     hover:bg-primary/20 transition-all">
                        <Edit2 className="w-4 h-4" /> Edit Details
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setEditing(false)}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] text-slate-400 rounded-xl text-sm font-medium
                       hover:bg-white/[0.08] transition-all">
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button onClick={handleSave}
                            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-medium
                       hover:shadow-lg hover:shadow-primary/20 transition-all">
                            <Save className="w-4 h-4" /> Save
                        </button>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.1s' }}>
                        <h3 className="text-lg font-semibold text-white mb-5">Center Information</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Name</label>
                                {editing ? (
                                    <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                ) : (
                                    <p className="text-white font-medium">{center.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Phone</label>
                                {editing ? (
                                    <input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                ) : (
                                    <p className="text-slate-300 flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" />{center.phone}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Description</label>
                                {editing ? (
                                    <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40 resize-none" />
                                ) : (
                                    <p className="text-slate-300 text-sm leading-relaxed">{center.description || 'No description'}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary-light" /> Address
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {['street', 'city', 'state', 'zipCode'].map(field => (
                                <div key={field}>
                                    <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">{field}</label>
                                    {editing ? (
                                        <input value={form.address?.[field] || ''}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, [field]: e.target.value } })}
                                            className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                    ) : (
                                        <p className="text-slate-300 text-sm">{center.address?.[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.3s' }}>
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary-light" /> Operating Hours
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Open</label>
                                {editing ? (
                                    <input value={form.operatingHours?.open || ''}
                                        onChange={(e) => setForm({ ...form, operatingHours: { ...form.operatingHours, open: e.target.value } })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                ) : (
                                    <p className="text-slate-300">{center.operatingHours?.open}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Close</label>
                                {editing ? (
                                    <input value={form.operatingHours?.close || ''}
                                        onChange={(e) => setForm({ ...form, operatingHours: { ...form.operatingHours, close: e.target.value } })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                ) : (
                                    <p className="text-slate-300">{center.operatingHours?.close}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.15s' }}>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Star className="w-4 h-4 text-yellow-400" />Rating
                                </div>
                                <span className="text-white font-bold text-lg">{center.rating || 'N/A'}</span>
                            </div>
                            <div className="h-px bg-white/[0.06]" />
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">Total Reviews</span>
                                <span className="text-white font-semibold">{center.totalReviews || 0}</span>
                            </div>
                            <div className="h-px bg-white/[0.06]" />
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-sm">Status</span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                  ${center.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                                    {center.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Services Offered */}
                    <div className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.25s' }}>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Wrench className="w-5 h-5 text-primary-light" /> Services Offered
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {center.servicesOffered?.map((s, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg bg-primary/[0.08] text-primary-light text-xs font-medium capitalize
                                       border border-primary/[0.15]">
                                    {s.replace(/_/g, ' ')}
                                </span>
                            ))}
                            {(!center.servicesOffered || center.servicesOffered.length === 0) && (
                                <p className="text-slate-500 text-sm">No services listed</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCenter;
