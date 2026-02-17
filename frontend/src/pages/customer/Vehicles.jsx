import { useState, useEffect } from 'react';
import API from '../../services/api';
import { Car, Plus, Edit, Trash2, X, Fuel, Calendar, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        type: 'car', brand: '', model: '', year: new Date().getFullYear(),
        registrationNumber: '', color: '', fuelType: 'petrol', mileage: 0
    });

    useEffect(() => { fetchVehicles(); }, []);

    const fetchVehicles = async () => {
        try {
            const { data } = await API.get('/vehicles');
            setVehicles(data.vehicles);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const openAdd = () => {
        setEditing(null);
        setForm({
            type: 'car', brand: '', model: '', year: new Date().getFullYear(),
            registrationNumber: '', color: '', fuelType: 'petrol', mileage: 0
        });
        setShowModal(true);
    };

    const openEdit = (v) => {
        setEditing(v._id);
        setForm({
            type: v.type, brand: v.brand, model: v.model, year: v.year,
            registrationNumber: v.registrationNumber, color: v.color || '', fuelType: v.fuelType, mileage: v.mileage || 0
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await API.put(`/vehicles/${editing}`, form);
                toast.success('Vehicle updated!');
            } else {
                await API.post('/vehicles', form);
                toast.success('Vehicle added!');
            }
            setShowModal(false);
            fetchVehicles();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save vehicle');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this vehicle?')) return;
        try {
            await API.delete(`/vehicles/${id}`);
            toast.success('Vehicle deleted');
            fetchVehicles();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    if (loading) {
        return <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-white">My Cars</h1>
                        <p className="text-slate-400 text-sm">Manage your registered cars</p>
                    </div>
                    <button onClick={openAdd}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary
                     text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
                        <Plus className="w-4 h-4" /> Add Vehicle
                    </button>
                </div>

                {vehicles.length === 0 ? (
                    <div className="glass-card p-12 rounded-2xl text-center animate-fade-in-up">
                        <Car className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No Cars Yet</h3>
                        <p className="text-slate-400 mb-6">Add your first car to start booking services</p>
                        <button onClick={openAdd}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary
                       text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
                            <Plus className="w-4 h-4" /> Add Your First Car
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((v, i) => (
                            <div key={v._id} className="glass-card glass-card-hover rounded-2xl overflow-hidden animate-fade-in-up"
                                style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-400">
                                                <Car className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{v.brand} {v.model}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <InfoRow icon={<Hash className="w-3.5 h-3.5" />} label="Reg. No" value={v.registrationNumber} />
                                        <InfoRow icon={<Calendar className="w-3.5 h-3.5" />} label="Year" value={v.year} />
                                        <InfoRow icon={<Fuel className="w-3.5 h-3.5" />} label="Fuel" value={v.fuelType} />
                                        {v.color && <InfoRow icon={<div className="w-3 h-3 rounded-full" style={{ backgroundColor: v.color.toLowerCase() }} />} label="Color" value={v.color} />}
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => openEdit(v)}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary-light
                               hover:bg-primary/20 transition-colors text-sm font-medium">
                                            <Edit className="w-3.5 h-3.5" /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(v._id)}
                                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400
                               hover:bg-red-500/20 transition-colors text-sm font-medium">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {
                showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                        <div className="w-full max-w-lg glass-card rounded-2xl p-6 animate-fade-in-up">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">{editing ? 'Edit Car' : 'Add Car'}</h2>
                                <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Type</label>
                                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                                            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:border-primary/50">
                                            <option value="car">Car</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Fuel Type</label>
                                        <select value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                                            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:border-primary/50">
                                            <option value="petrol">Petrol</option>
                                            <option value="diesel">Diesel</option>
                                            <option value="electric">Electric</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="cng">CNG</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Brand</label>
                                        <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                            required placeholder="Honda"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Model</label>
                                        <input type="text" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}
                                            required placeholder="City"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Year</label>
                                        <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                            required min="1990" max={new Date().getFullYear() + 1}
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Registration No.</label>
                                        <input type="text" value={form.registrationNumber} onChange={(e) => setForm({ ...form, registrationNumber: e.target.value.toUpperCase() })}
                                            required placeholder="MH01AB1234"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Color</label>
                                        <input type="text" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                                            placeholder="Silver"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Mileage (km)</label>
                                        <input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                                            min="0"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/50" />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium
                           hover:shadow-lg hover:shadow-primary/30 transition-all">
                                        {editing ? 'Update' : 'Add'} Car
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">{icon}</span>
        <span className="text-slate-400">{label}:</span>
        <span className="text-white capitalize">{value}</span>
    </div>
);

export default Vehicles;
