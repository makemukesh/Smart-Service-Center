import { useState, useEffect } from 'react';
import API from '../../services/api';
import {
    Building2, Plus, Search, Edit2, Trash2, X, Save, MapPin, Phone, Clock,
    Star, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPES = [
    'general_service', 'oil_change', 'brake_repair', 'engine_repair',
    'tire_replacement', 'battery_replacement', 'ac_service', 'body_repair',
    'painting', 'wheel_alignment', 'transmission_repair', 'electrical_repair',
    'full_inspection', 'wash_detailing'
];

const ManageCenters = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCenter, setEditingCenter] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        name: '', description: '', phone: '',
        address: { street: '', city: '', state: '', zipCode: '' },
        operatingHours: { open: '08:00', close: '18:00' },
        servicesOffered: []
    });

    useEffect(() => { fetchCenters(); }, []);

    const fetchCenters = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/service-centers');
            setCenters(data.centers);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const resetForm = () => {
        setForm({
            name: '', description: '', phone: '',
            address: { street: '', city: '', state: '', zipCode: '' },
            operatingHours: { open: '08:00', close: '18:00' },
            servicesOffered: []
        });
        setEditingCenter(null);
    };

    const openCreate = () => { resetForm(); setShowModal(true); };
    const openEdit = (c) => {
        setEditingCenter(c);
        setForm({
            name: c.name, description: c.description || '', phone: c.phone,
            address: c.address || { street: '', city: '', state: '', zipCode: '' },
            operatingHours: c.operatingHours || { open: '08:00', close: '18:00' },
            servicesOffered: c.servicesOffered || []
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (editingCenter) {
                await API.put(`/service-centers/${editingCenter._id}`, form);
                toast.success('Center updated');
            } else {
                await API.post('/service-centers', form);
                toast.success('Center created');
            }
            setShowModal(false);
            resetForm();
            fetchCenters();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Operation failed');
        }
    };

    const deleteCenter = async (id) => {
        if (!confirm('Delete this service center?')) return;
        try {
            await API.delete(`/service-centers/${id}`);
            toast.success('Center deleted');
            fetchCenters();
        } catch (err) { toast.error('Delete failed'); }
    };

    const toggleService = (service) => {
        const current = form.servicesOffered || [];
        setForm({
            ...form,
            servicesOffered: current.includes(service)
                ? current.filter(s => s !== service)
                : [...current, service]
        });
    };

    const filtered = centers.filter(c =>
        !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.address?.city?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Service Centers</h1>
                        <p className="text-slate-500 text-sm">{centers.length} centers registered</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search centers..."
                            className="pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                       placeholder-slate-600 focus:border-primary/40 w-52" />
                    </div>
                    <button onClick={openCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm
                     font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all">
                        <Plus className="w-4 h-4" /> Add Center
                    </button>
                </div>
            </div>

            {/* Centers Grid */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((c, i) => (
                        <div key={c._id}
                            className="glass-card glass-card-hover rounded-2xl overflow-hidden animate-fade-in-up"
                            style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                            <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-primary-light" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white">{c.name}</h3>
                                            <div className="flex items-center gap-1 text-xs">
                                                <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                                                <span className="text-yellow-400 font-medium">{c.rating || 'N/A'}</span>
                                                <span className="text-slate-600">({c.totalReviews || 0})</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => openEdit(c)}
                                            className="p-2 text-slate-500 hover:text-primary-light hover:bg-primary/10 rounded-lg transition-all">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => deleteCenter(c._id)}
                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {c.description && (
                                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{c.description}</p>
                                )}

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <MapPin className="w-3.5 h-3.5 text-slate-600" />
                                        {c.address?.street}, {c.address?.city}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Phone className="w-3.5 h-3.5 text-slate-600" />
                                        {c.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                                        {c.operatingHours?.open} - {c.operatingHours?.close}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {c.servicesOffered?.slice(0, 3).map((s, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-md bg-primary/[0.08] text-primary-light text-[10px] font-medium capitalize border border-primary/[0.12]">
                                            {s.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                    {c.servicesOffered?.length > 3 && (
                                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-slate-500 border border-white/[0.06]">
                                            +{c.servicesOffered.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16">
                            <Building2 className="w-12 h-12 mx-auto text-slate-700 mb-3" />
                            <p className="text-slate-500 font-medium">No centers found</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="w-full max-w-2xl glass-card rounded-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-xl px-6 py-4 border-b border-white/[0.06] flex items-center justify-between rounded-t-2xl z-10">
                            <h2 className="text-lg font-bold text-white">
                                {editingCenter ? 'Edit Service Center' : 'Add Service Center'}
                            </h2>
                            <button onClick={() => { setShowModal(false); resetForm(); }}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Name *</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="AutoCare Pro"
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-slate-600 focus:border-primary/40" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Phone *</label>
                                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-slate-600 focus:border-primary/40" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Description</label>
                                <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Describe the service center..."
                                    className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-slate-600 focus:border-primary/40 resize-none" />
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Address</label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {[
                                        { key: 'street', placeholder: 'Street', full: true },
                                        { key: 'city', placeholder: 'City' },
                                        { key: 'state', placeholder: 'State' },
                                        { key: 'zipCode', placeholder: 'Zip Code' },
                                    ].map(f => (
                                        <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
                                            <input value={form.address?.[f.key] || ''}
                                                onChange={(e) => setForm({ ...form, address: { ...form.address, [f.key]: e.target.value } })}
                                                placeholder={f.placeholder}
                                                className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder-slate-600 focus:border-primary/40" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Open Time</label>
                                    <input type="time" value={form.operatingHours?.open || '08:00'}
                                        onChange={(e) => setForm({ ...form, operatingHours: { ...form.operatingHours, open: e.target.value } })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">Close Time</label>
                                    <input type="time" value={form.operatingHours?.close || '18:00'}
                                        onChange={(e) => setForm({ ...form, operatingHours: { ...form.operatingHours, close: e.target.value } })}
                                        className="w-full px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 font-medium mb-2 uppercase tracking-wide">Services Offered</label>
                                <div className="flex flex-wrap gap-2">
                                    {SERVICE_TYPES.map(s => (
                                        <button key={s} onClick={() => toggleService(s)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 border
                        ${form.servicesOffered?.includes(s)
                                                    ? 'bg-primary/15 text-primary-light border-primary/25'
                                                    : 'bg-white/[0.03] text-slate-500 border-white/[0.06] hover:borderwhite/[0.12] hover:text-slate-300'
                                                }`}>
                                            {s.replace(/_/g, ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-[#0f172a]/95 backdrop-blur-xl px-6 py-4 border-t border-white/[0.06] flex justify-end gap-3 rounded-b-2xl">
                            <button onClick={() => { setShowModal(false); resetForm(); }}
                                className="px-5 py-2.5 bg-white/[0.05] text-slate-400 rounded-xl text-sm font-medium hover:bg-white/[0.08] transition-all">
                                Cancel
                            </button>
                            <button onClick={handleSave}
                                className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-sm font-semibold
                         hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-1.5">
                                <Save className="w-4 h-4" /> {editingCenter ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCenters;
