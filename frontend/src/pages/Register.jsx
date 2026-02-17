import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Car, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import LocationFilter from '../components/LocationFilter';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '', phone: '',
        state: '', city: '', taluka: '', village: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const user = await register({
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                state: form.state,
                city: form.city,
                taluka: form.taluka,
                village: form.village
            });
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLocationChange = (locationData) => {
        setForm({ ...form, ...locationData });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="fixed inset-0 z-0">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4
                        shadow-lg shadow-primary/30">
                        <Car className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                    <p className="text-slate-400 mt-1">Join SmartService today</p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <p className="text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="text" name="name" value={form.name} onChange={handleChange}
                                    placeholder="John Doe" required
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="email" name="email" value={form.email} onChange={handleChange}
                                    placeholder="you@example.com" required
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                                    placeholder="9876543210" pattern="[0-9]{10}"
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all" />
                            </div>
                        </div>

                        {/* Location Fields */}
                        <div className="pt-2 pb-1">
                            <p className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center">
                                    <span className="text-[10px] text-primary-light">📍</span>
                                </span>
                                Location Details
                                <span className="text-[11px] text-slate-600 font-normal">(Optional)</span>
                            </p>
                            <LocationFilter
                                values={{ state: form.state, city: form.city, taluka: form.taluka, village: form.village }}
                                onChange={handleLocationChange}
                                mode="form"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                                    placeholder="Min 6 characters" required
                                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                                    placeholder="Confirm password" required
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl
                       hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50
                       flex items-center justify-center gap-2 group mt-2">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-light hover:text-primary font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
