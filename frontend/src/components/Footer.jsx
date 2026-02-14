import { Car, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-dark/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                                <Car className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-lg font-bold gradient-text">SmartService</span>
                                <p className="text-[10px] text-slate-400 -mt-1">Vehicle Booking System</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                            Your one-stop solution for vehicle service booking. Connect with the best service centers,
                            track your vehicle's maintenance, and enjoy a seamless service experience.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <SocialIcon icon={<Github className="w-4 h-4" />} />
                            <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                            <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
                        <div className="space-y-2">
                            <FooterLink to="/services">Services</FooterLink>
                            <FooterLink to="/centers">Service Centers</FooterLink>
                            <FooterLink to="/register">Get Started</FooterLink>
                            <FooterLink to="/login">Login</FooterLink>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>support@smartservice.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        © 2026 SmartService. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-slate-500">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                       text-slate-400 hover:text-white hover:bg-primary/20 hover:border-primary/30 transition-all">
        {icon}
    </a>
);

const FooterLink = ({ to, children }) => (
    <Link to={to} className="block text-sm text-slate-400 hover:text-primary transition-colors">
        {children}
    </Link>
);

export default Footer;
