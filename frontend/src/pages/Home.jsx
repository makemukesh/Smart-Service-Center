import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Car, Shield, Clock, CreditCard, Star, ArrowRight,
    Wrench, Sparkles, CheckCircle, ChevronRight, Zap, Users
} from 'lucide-react';

const Home = () => {
    const { user } = useAuth();

    const services = [
        { icon: Wrench, title: 'General Service', desc: 'Complete multi-point inspection and maintenance', price: '$99', color: 'from-blue-500 to-cyan-500' },
        { icon: Car, title: 'Engine Repair', desc: 'Expert diagnostics and engine repair services', price: '$299', color: 'from-purple-500 to-pink-500' },
        { icon: Shield, title: 'Brake Repair', desc: 'Safety-critical brake system inspection and repair', price: '$149', color: 'from-amber-500 to-orange-500' },
        { icon: Sparkles, title: 'Detailing', desc: 'Premium wash, polish, and interior detailing', price: '$39', color: 'from-emerald-500 to-teal-500' },
        { icon: Zap, title: 'AC Service', desc: 'Complete AC system check, gas refill and repair', price: '$69', color: 'from-rose-500 to-red-500' },
        { icon: CheckCircle, title: 'Full Inspection', desc: '200-point comprehensive vehicle health check', price: '$79', color: 'from-indigo-500 to-violet-500' },
    ];

    const stats = [
        { value: '50,000+', label: 'Services Done' },
        { value: '500+', label: 'Expert Mechanics' },
        { value: '100+', label: 'Service Centers' },
        { value: '4.8★', label: 'Average Rating' },
    ];

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-[120px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>#1 Vehicle Service Platform</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                                <span className="text-white">Smart Vehicle</span>
                                <br />
                                <span className="gradient-text">Service Booking</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
                                Book your vehicle service in minutes. Track progress in real-time.
                                Get your vehicle serviced by certified professionals at the best service centers near you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to={user ? '/dashboard/book' : '/register'}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary
                           text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-primary/30
                           transition-all duration-300 hover:-translate-y-0.5 group">
                                    Book a Service
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/centers"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 glass-card
                           text-white font-medium rounded-2xl hover:bg-white/10 transition-all duration-300">
                                    Explore Centers
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="hidden lg:flex justify-center animate-fade-in-up delay-200" style={{ opacity: 0 }}>
                            <div className="relative">
                                <div className="w-[480px] h-[480px] rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20
                              border border-white/10 backdrop-blur-sm flex items-center justify-center animate-float">
                                    <div className="text-center">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary
                                  flex items-center justify-center animate-pulse-glow">
                                            <Car className="w-16 h-16 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Your Vehicle</h3>
                                        <p className="text-slate-400">Deserves the Best Care</p>
                                        <div className="mt-6 flex justify-center gap-4">
                                            {['🔧', '🛡️', '⚡', '✨'].map((emoji, i) => (
                                                <span key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                                                    {emoji}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* Floating cards */}
                                <div className="absolute -top-4 -right-4 glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '0.5s' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-white">Service Complete</p>
                                            <p className="text-[10px] text-slate-400">Honda City · Oil Change</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -left-4 glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-white">4.8 Rating</p>
                                            <p className="text-[10px] text-slate-400">128 Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center animate-fade-in-up" style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                                <p className="text-3xl font-extrabold gradient-text">{stat.value}</p>
                                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12 animate-fade-in-up" style={{ opacity: 0 }}>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Services</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Professional vehicle maintenance services with transparent pricing and certified mechanics
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <div key={i}
                                className="glass-card glass-card-hover p-6 rounded-2xl transition-all duration-300 animate-fade-in-up cursor-pointer group"
                                style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                                <p className="text-sm text-slate-400 mb-4 leading-relaxed">{service.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold gradient-text">From {service.price}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-slate-400">Book your service in 4 simple steps</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { step: '01', title: 'Register', desc: 'Create your account and add your vehicles', icon: Users },
                            { step: '02', title: 'Book', desc: 'Choose service center, type, and schedule', icon: CalendarCheck },
                            { step: '03', title: 'Track', desc: 'Monitor your service progress in real-time', icon: Clock },
                            { step: '04', title: 'Pay & Review', desc: 'Secure payment and share your feedback', icon: CreditCard },
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl text-center animate-fade-in-up"
                                style={{ opacity: 0, animationDelay: `${i * 0.15}s` }}>
                                <div className="text-4xl font-extrabold gradient-text mb-3">{item.step}</div>
                                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                    <item.icon className="w-6 h-6 text-primary-light" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="glass-card p-8 sm:p-12 rounded-3xl text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                Join thousands of happy vehicle owners who trust SmartService for their vehicle maintenance needs.
                            </p>
                            <Link to="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary
                         text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-primary/30
                         transition-all duration-300 hover:-translate-y-0.5 group text-lg">
                                Create Free Account
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Import used in How it Works but defined locally
const CalendarCheck = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 2v4M16 2v4M3 10h18M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
        <path d="m16 20 2 2 4-4" />
    </svg>
);

export default Home;
