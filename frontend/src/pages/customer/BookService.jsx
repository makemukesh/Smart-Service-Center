import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { Car, Building2, Calendar, Clock, Wrench, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPES = [
    { value: 'general_service', label: 'General Service', price: 2499 },
    { value: 'oil_change', label: 'Oil Change', price: 1499 },
    { value: 'brake_repair', label: 'Brake Repair', price: 3499 },
    { value: 'engine_repair', label: 'Engine Repair', price: 8999 },
    { value: 'tire_replacement', label: 'Tire Replacement', price: 1999 },
    { value: 'battery_replacement', label: 'Battery Replacement', price: 2499 },
    { value: 'ac_service', label: 'AC Service', price: 1999 },
    { value: 'body_repair', label: 'Body Repair', price: 4999 },
    { value: 'painting', label: 'Painting', price: 9999 },
    { value: 'wheel_alignment', label: 'Wheel Alignment', price: 999 },
    { value: 'transmission_repair', label: 'Transmission Repair', price: 7999 },
    { value: 'electrical_repair', label: 'Electrical Repair', price: 2999 },
    { value: 'full_inspection', label: 'Full Inspection', price: 1499 },
    { value: 'wash_and_detailing', label: 'Wash & Detailing', price: 999 },
];

const BookService = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        vehicle: '', serviceCenter: '', serviceType: '',
        scheduledDate: '', scheduledTime: '10:00', notes: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vRes, cRes] = await Promise.all([
                    API.get('/vehicles'),
                    API.get('/service-centers')
                ]);
                setVehicles(vRes.data.vehicles);
                setCenters(cRes.data.centers);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            await API.post('/bookings', form);
            toast.success('Service booked successfully!');
            navigate('/dashboard/bookings');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Booking failed');
        } finally {
            setSubmitting(false);
        }
    };

    const selectedService = SERVICE_TYPES.find(s => s.value === form.serviceType);
    const selectedCenter = centers.find(c => c._id === form.serviceCenter);
    const selectedVehicle = vehicles.find(v => v._id === form.vehicle);

    const canProceed = () => {
        if (step === 1) return form.vehicle;
        if (step === 2) return form.serviceCenter;
        if (step === 3) return form.serviceType && form.scheduledDate;
        return true;
    };

    if (loading) {
        return <div className="min-h-screen pt-24 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>;
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-2xl font-bold text-white">Book a Service</h1>
                    <p className="text-slate-400 mt-1">Follow the steps to schedule your vehicle service</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 glass-card p-4 rounded-xl">
                    {['Select Vehicle', 'Choose Center', 'Service Details', 'Confirm'].map((label, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${i + 1 <= step ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-white/5 text-slate-500'}`}>
                                {i + 1}
                            </div>
                            <span className={`hidden sm:inline text-sm ${i + 1 <= step ? 'text-white' : 'text-slate-500'}`}>{label}</span>
                            {i < 3 && <div className={`hidden sm:block w-8 h-0.5 ${i + 1 < step ? 'bg-primary' : 'bg-white/10'}`} />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
                    {step === 1 && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Car className="w-5 h-5 text-primary-light" /> Select Vehicle
                            </h2>
                            {vehicles.length === 0 ? (
                                <div className="text-center py-8">
                                    <AlertCircle className="w-12 h-12 mx-auto text-amber-400 mb-3" />
                                    <p className="text-white font-medium">No cars found</p>
                                    <p className="text-sm text-slate-400 mt-1">Please add a vehicle first</p>
                                    <button onClick={() => navigate('/dashboard/vehicles')}
                                        className="mt-4 px-4 py-2 bg-primary/20 text-primary-light rounded-lg hover:bg-primary/30 transition-colors">
                                        Add Vehicle
                                    </button>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {vehicles.map((v) => (
                                        <button key={v._id} onClick={() => setForm({ ...form, vehicle: v._id })}
                                            className={`p-4 rounded-xl border text-left transition-all
                        ${form.vehicle === v._id
                                                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                                            <div className="flex items-center gap-3">
                                                <Car className={`w-8 h-8 ${form.vehicle === v._id ? 'text-primary-light' : 'text-slate-400'}`} />
                                                <div>
                                                    <p className="font-medium text-white">{v.brand} {v.model}</p>
                                                    <p className="text-xs text-slate-400">{v.registrationNumber} · {v.year}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-primary-light" /> Choose Service Center
                            </h2>
                            <div className="space-y-4">
                                {centers.map((c) => (
                                    <button key={c._id} onClick={() => setForm({ ...form, serviceCenter: c._id })}
                                        className={`w-full p-4 rounded-xl border text-left transition-all
                      ${form.serviceCenter === c._id
                                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-white">{c.name}</p>
                                                <p className="text-sm text-slate-400">{c.address?.street}, {c.address?.city}</p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {c.operatingHours?.open} - {c.operatingHours?.close} · {c.phone}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm">
                                                ⭐ {c.rating}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Wrench className="w-5 h-5 text-primary-light" /> Service Details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-300 mb-2">Service Type</label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {SERVICE_TYPES.map((s) => (
                                            <button key={s.value} onClick={() => setForm({ ...form, serviceType: s.value })}
                                                className={`p-3 rounded-lg border text-left text-sm transition-all
                          ${form.serviceType === s.value
                                                        ? 'border-primary bg-primary/10 text-white'
                                                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'}`}>
                                                <div className="flex justify-between">
                                                    <span>{s.label}</span>
                                                    <span className="font-semibold text-primary-light">₹{s.price.toLocaleString('en-IN')}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Date</label>
                                        <input type="date" value={form.scheduledDate}
                                            onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]} required
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-300 mb-1">Time</label>
                                        <input type="time" value={form.scheduledTime}
                                            onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-300 mb-1">Notes (optional)</label>
                                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        rows="3" placeholder="Any special instructions..."
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary-light" /> Booking Summary
                            </h2>
                            <div className="space-y-4 p-4 rounded-xl bg-white/5">
                                <SummaryRow label="Vehicle" value={`${selectedVehicle?.brand} ${selectedVehicle?.model} (${selectedVehicle?.registrationNumber})`} />
                                <SummaryRow label="Service Center" value={selectedCenter?.name} />
                                <SummaryRow label="Service" value={selectedService?.label} />
                                <SummaryRow label="Date" value={new Date(form.scheduledDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
                                <SummaryRow label="Time" value={form.scheduledTime} />
                                {form.notes && <SummaryRow label="Notes" value={form.notes} />}
                                <div className="border-t border-white/10 pt-3">
                                    <SummaryRow label="Estimated Cost" value={`₹${selectedService?.price?.toLocaleString('en-IN')}`} highlight />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                        <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}
                            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            Back
                        </button>
                        {step < 4 ? (
                            <button onClick={() => setStep(step + 1)} disabled={!canProceed()}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium
                         hover:shadow-lg hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all flex items-center gap-2 group">
                                Next <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={submitting}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium
                         hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 transition-all flex items-center gap-2">
                                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirm Booking'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SummaryRow = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">{label}</span>
        <span className={`text-sm font-medium ${highlight ? 'text-emerald-400 text-lg' : 'text-white'}`}>{value}</span>
    </div>
);

export default BookService;
