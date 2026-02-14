import { Link } from 'react-router-dom';
import {
    Wrench, Car, Shield, Sparkles, Zap, CheckCircle, Eye,
    Paintbrush, Battery, Disc, Cable, ArrowRight
} from 'lucide-react';

const allServices = [
    { icon: Wrench, name: 'General Service', desc: 'Complete multi-point vehicle inspection and scheduled maintenance service', price: 99, color: 'from-blue-500 to-cyan-500' },
    { icon: Car, name: 'Oil Change', desc: 'Premium engine oil replacement with filter change for optimal performance', price: 49, color: 'from-green-500 to-emerald-500' },
    { icon: Shield, name: 'Brake Repair', desc: 'Complete brake system inspection, pad replacement and rotor service', price: 149, color: 'from-amber-500 to-orange-500' },
    { icon: Zap, name: 'Engine Repair', desc: 'Advanced engine diagnostics and repair by certified mechanics', price: 299, color: 'from-red-500 to-rose-500' },
    { icon: Disc, name: 'Tire Replacement', desc: 'Premium tire fitting, balancing and alignment services', price: 79, color: 'from-violet-500 to-purple-500' },
    { icon: Battery, name: 'Battery Replacement', desc: 'Battery testing and replacement with warranty-backed batteries', price: 89, color: 'from-yellow-500 to-amber-500' },
    { icon: Sparkles, name: 'AC Service', desc: 'Complete AC system check, gas refill, and cooling optimization', price: 69, color: 'from-cyan-500 to-teal-500' },
    { icon: Paintbrush, name: 'Body Repair', desc: 'Dent removal, scratch repair, and body panel restoration', price: 199, color: 'from-pink-500 to-rose-500' },
    { icon: Eye, name: 'Painting', desc: 'Professional auto painting with color matching technology', price: 399, color: 'from-indigo-500 to-blue-500' },
    { icon: Disc, name: 'Wheel Alignment', desc: 'Computer-aided precision wheel alignment for safer driving', price: 59, color: 'from-teal-500 to-green-500' },
    { icon: Cable, name: 'Transmission Repair', desc: 'Gearbox diagnostics, fluid change, and transmission overhaul', price: 349, color: 'from-orange-500 to-red-500' },
    { icon: Zap, name: 'Electrical Repair', desc: 'Wiring, starter, alternator, and electrical system repair', price: 129, color: 'from-purple-500 to-violet-500' },
    { icon: CheckCircle, name: 'Full Inspection', desc: 'Comprehensive 200-point vehicle health check with detailed report', price: 79, color: 'from-emerald-500 to-green-500' },
    { icon: Sparkles, name: 'Wash & Detailing', desc: 'Premium exterior wash, interior deep clean, and polish', price: 39, color: 'from-sky-500 to-blue-500' },
];

const Services = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Services</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Complete range of vehicle maintenance and repair services with transparent pricing and expert technicians
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {allServices.map((service, i) => (
                        <div key={i}
                            className="glass-card glass-card-hover p-5 rounded-2xl transition-all duration-300 animate-fade-in-up group cursor-pointer"
                            style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1.5">{service.name}</h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-2">{service.desc}</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-slate-500">Starting from</span>
                                    <p className="text-lg font-bold gradient-text">${service.price}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.5s' }}>
                    <Link to="/register"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary to-secondary
                     text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all group">
                        Book a Service Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
