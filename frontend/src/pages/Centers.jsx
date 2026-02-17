import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import {
    Building2, Star, MapPin, Phone, Clock, Search, ChevronRight,
    SlidersHorizontal, X, ChevronDown, ChevronUp, Filter, RotateCcw
} from 'lucide-react';

const SERVICE_TYPES = [
    { value: 'general_service', label: 'General Service' },
    { value: 'oil_change', label: 'Oil Change' },
    { value: 'brake_repair', label: 'Brake Repair' },
    { value: 'engine_repair', label: 'Engine Repair' },
    { value: 'tire_replacement', label: 'Tire Replacement' },
    { value: 'battery_replacement', label: 'Battery Replacement' },
    { value: 'ac_service', label: 'AC Service' },
    { value: 'body_repair', label: 'Body Repair' },
    { value: 'painting', label: 'Painting' },
    { value: 'wheel_alignment', label: 'Wheel Alignment' },
    { value: 'transmission_repair', label: 'Transmission Repair' },
    { value: 'electrical_repair', label: 'Electrical Repair' },
    { value: 'full_inspection', label: 'Full Inspection' },
    { value: 'wash_and_detailing', label: 'Wash & Detailing' }
];

const RATING_OPTIONS = [
    { value: 4, label: '4★ & above' },
    { value: 3, label: '3★ & above' },
    { value: 2, label: '2★ & above' },
    { value: 1, label: '1★ & above' }
];

const Centers = () => {
    const [centers, setCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Location filter states
    const [cities, setCities] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [villages, setVillages] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedTaluka, setSelectedTaluka] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    // Other filters
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');

    // Collapsible sections
    const [openSections, setOpenSections] = useState({
        location: true, services: true, rating: true
    });

    // Fetch cities on mount (Gujarat is default state)
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await API.get('/locations/cities');
                setCities(data.cities || []);
            } catch (err) { console.error(err); }
        };
        fetchCities();
    }, []);

    // Fetch talukas when city changes
    useEffect(() => {
        if (!selectedCity) { setTalukas([]); return; }
        const fetch = async () => {
            try {
                const { data } = await API.get(`/locations/talukas?city=${selectedCity}`);
                setTalukas(data.talukas || []);
            } catch (err) { console.error(err); }
        };
        fetch();
    }, [selectedCity]);

    // Fetch villages when taluka changes
    useEffect(() => {
        if (!selectedTaluka) { setVillages([]); return; }
        const fetch = async () => {
            try {
                const { data } = await API.get(`/locations/villages?city=${selectedCity}&taluka=${selectedTaluka}`);
                setVillages(data.villages || []);
            } catch (err) { console.error(err); }
        };
        fetch();
    }, [selectedTaluka]);

    // Fetch centers whenever filters change
    useEffect(() => {
        const fetchCenters = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (selectedCity) params.append('city', selectedCity);
                if (selectedTaluka) params.append('taluka', selectedTaluka);
                if (selectedVillage) params.append('village', selectedVillage);
                if (selectedServices.length === 1) params.append('service', selectedServices[0]);
                if (selectedRating) params.append('minRating', selectedRating);

                const { data } = await API.get(`/service-centers?${params.toString()}`);
                let results = data.centers || [];

                // Client-side filter for multiple services
                if (selectedServices.length > 1) {
                    results = results.filter(c =>
                        selectedServices.every(s => c.servicesOffered?.includes(s))
                    );
                }
                setCenters(results);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        const debounce = setTimeout(fetchCenters, 300);
        return () => clearTimeout(debounce);
    }, [search, selectedCity, selectedTaluka, selectedVillage, selectedServices, selectedRating]);

    const toggleSection = (key) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    const toggleService = (val) => {
        setSelectedServices(prev =>
            prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]
        );
    };

    const clearAllFilters = () => {
        setSelectedCity(''); setSelectedTaluka(''); setSelectedVillage('');
        setSelectedServices([]); setSelectedRating(''); setSearch('');
    };

    const removeFilter = (type, value) => {
        switch (type) {
            case 'city': setSelectedCity(''); setSelectedTaluka(''); setSelectedVillage(''); break;
            case 'taluka': setSelectedTaluka(''); setSelectedVillage(''); break;
            case 'village': setSelectedVillage(''); break;
            case 'service': setSelectedServices(prev => prev.filter(s => s !== value)); break;
            case 'rating': setSelectedRating(''); break;
        }
    };

    const activeFilters = [
        ...(selectedCity ? [{ type: 'city', label: selectedCity }] : []),
        ...(selectedTaluka ? [{ type: 'taluka', label: selectedTaluka }] : []),
        ...(selectedVillage ? [{ type: 'village', label: selectedVillage }] : []),
        ...selectedServices.map(s => ({ type: 'service', label: SERVICE_TYPES.find(st => st.value === s)?.label || s, value: s })),
        ...(selectedRating ? [{ type: 'rating', label: `${selectedRating}★ & above` }] : [])
    ];

    const FilterSection = ({ title, icon, sectionKey, children }) => (
        <div className="border-b border-white/[0.06] last:border-b-0">
            <button onClick={() => toggleSection(sectionKey)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.02] transition-colors">
                <span className="flex items-center gap-2.5">
                    {icon}
                    {title}
                </span>
                {openSections[sectionKey] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            {openSections[sectionKey] && (
                <div className="px-5 pb-4 animate-fade-in-up" style={{ animationDuration: '0.15s' }}>
                    {children}
                </div>
            )}
        </div>
    );

    const Sidebar = () => (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Filter className="w-4 h-4 text-primary-light" />
                    </div>
                    <span className="font-bold text-white text-[15px] tracking-tight">Filters</span>
                </div>
                {activeFilters.length > 0 && (
                    <button onClick={clearAllFilters}
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:text-primary transition-colors">
                        <RotateCcw className="w-3 h-3" />
                        Clear All
                    </button>
                )}
                {/* Mobile close */}
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-500 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Location Section */}
            <FilterSection title="Location" icon={<MapPin className="w-4 h-4 text-emerald-400" />} sectionKey="location">
                <div className="space-y-2.5">
                    <select value={selectedCity}
                        onChange={(e) => { setSelectedCity(e.target.value); setSelectedTaluka(''); setSelectedVillage(''); }}
                        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white
                            focus:border-primary/40 focus:ring-1 focus:ring-primary/20 cursor-pointer transition-all">
                        <option value="">All Cities (Gujarat)</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {selectedCity && talukas.length > 0 && (
                        <select value={selectedTaluka}
                            onChange={(e) => { setSelectedTaluka(e.target.value); setSelectedVillage(''); }}
                            className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white
                                focus:border-primary/40 cursor-pointer transition-all">
                            <option value="">All Talukas</option>
                            {talukas.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    )}
                    {selectedTaluka && villages.length > 0 && (
                        <select value={selectedVillage}
                            onChange={(e) => setSelectedVillage(e.target.value)}
                            className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white
                                focus:border-primary/40 cursor-pointer transition-all">
                            <option value="">All Villages</option>
                            {villages.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    )}
                </div>
            </FilterSection>

            {/* Services Section */}
            <FilterSection title="Service Type" icon={<Building2 className="w-4 h-4 text-blue-400" />} sectionKey="services">
                <div className="space-y-1 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                    {SERVICE_TYPES.map(st => (
                        <label key={st.value}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] cursor-pointer group transition-colors">
                            <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all
                                ${selectedServices.includes(st.value)
                                    ? 'bg-primary border-primary'
                                    : 'border-white/20 group-hover:border-white/40'}`}>
                                {selectedServices.includes(st.value) && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                            <input type="checkbox" checked={selectedServices.includes(st.value)}
                                onChange={() => toggleService(st.value)} className="hidden" />
                            <span className="text-[13px] text-slate-400 group-hover:text-slate-300 transition-colors">{st.label}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Rating Section */}
            <FilterSection title="Customer Rating" icon={<Star className="w-4 h-4 text-yellow-400" />} sectionKey="rating">
                <div className="space-y-1">
                    {RATING_OPTIONS.map(r => (
                        <label key={r.value}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.03] cursor-pointer group transition-colors">
                            <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all
                                ${selectedRating == r.value
                                    ? 'border-primary'
                                    : 'border-white/20 group-hover:border-white/40'}`}>
                                {selectedRating == r.value && (
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>
                            <input type="radio" name="rating" value={r.value}
                                checked={selectedRating == r.value}
                                onChange={(e) => setSelectedRating(e.target.value)} className="hidden" />
                            <span className="text-[13px] text-slate-400 group-hover:text-slate-300 flex items-center gap-1 transition-colors">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < r.value ? 'text-yellow-400' : 'text-slate-700'}`}
                                        fill={i < r.value ? 'currentColor' : 'none'} />
                                ))}
                                <span className="ml-1">& above</span>
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Page Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Service Centers</h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Find trusted service centers near you with verified ratings and transparent pricing
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* === LEFT SIDEBAR (Desktop) === */}
                    <aside className="hidden lg:block w-[280px] flex-shrink-0 animate-fade-in-up">
                        <div className="glass-card rounded-2xl overflow-hidden sticky top-28">
                            <Sidebar />
                        </div>
                    </aside>

                    {/* === Mobile Filter Overlay === */}
                    {sidebarOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                            <div className="absolute left-0 top-0 bottom-0 w-[320px] bg-[#0d1117] border-r border-white/[0.06] overflow-y-auto animate-fade-in-up">
                                <Sidebar />
                            </div>
                        </div>
                    )}

                    {/* === RIGHT CONTENT === */}
                    <div className="flex-1 min-w-0">
                        {/* Search + Mobile Filter Toggle */}
                        <div className="flex gap-3 mb-5 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
                            <button onClick={() => setSidebarOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-3 glass-card rounded-xl text-sm text-slate-300 hover:text-white
                                    transition-colors flex-shrink-0">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {activeFilters.length > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
                                        {activeFilters.length}
                                    </span>
                                )}
                            </button>
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name, city, or taluka..."
                                    className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                                        placeholder-slate-600 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all" />
                            </div>
                        </div>

                        {/* Active Filter Chips */}
                        {activeFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5 animate-fade-in-up" style={{ animationDelay: '0.12s', opacity: 0 }}>
                                {activeFilters.map((f, i) => (
                                    <button key={i} onClick={() => removeFilter(f.type, f.value)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20
                                            text-xs font-medium text-primary-light hover:bg-primary/20 transition-all group">
                                        {f.label}
                                        <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                                <button onClick={clearAllFilters}
                                    className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors">
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Results Count */}
                        <div className="flex items-center justify-between mb-4 animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
                            <p className="text-sm text-slate-500">
                                {loading ? 'Searching...' : (
                                    <>
                                        Showing <span className="text-white font-semibold">{centers.length}</span> service center{centers.length !== 1 ? 's' : ''}
                                        {activeFilters.length > 0 && <span className="text-slate-600"> (filtered)</span>}
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Results Grid */}
                        {loading ? (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            </div>
                        ) : centers.length === 0 ? (
                            <div className="glass-card rounded-2xl p-16 text-center">
                                <Building2 className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No Centers Found</h3>
                                <p className="text-slate-400 text-sm mb-6">Try adjusting your filters or search query</p>
                                <button onClick={clearAllFilters}
                                    className="px-5 py-2.5 bg-primary/10 text-primary-light text-sm font-medium rounded-xl hover:bg-primary/20 transition-all">
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">
                                {centers.map((c, i) => (
                                    <div key={c._id}
                                        className="glass-card glass-card-hover rounded-2xl overflow-hidden animate-fade-in-up group"
                                        style={{ opacity: 0, animationDelay: `${0.2 + i * 0.06}s` }}>
                                        {/* Top gradient bar */}
                                        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
                                        <div className="p-5">
                                            {/* Name + Rating row */}
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center flex-shrink-0">
                                                        <Building2 className="w-5 h-5 text-primary-light" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-base font-bold text-white leading-tight">{c.name}</h3>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/10">
                                                                <Star className="w-3 h-3 text-emerald-400" fill="currentColor" />
                                                                <span className="text-xs font-bold text-emerald-400">{c.rating}</span>
                                                            </div>
                                                            <span className="text-[11px] text-slate-500">({c.totalReviews} reviews)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            {c.description && (
                                                <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{c.description}</p>
                                            )}

                                            {/* Info rows */}
                                            <div className="space-y-1.5 mb-3">
                                                <div className="flex items-start gap-2 text-[13px] text-slate-400">
                                                    <MapPin className="w-3.5 h-3.5 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        {c.address?.street}, {c.address?.city}, {c.address?.state}
                                                        {c.address?.taluka ? ` (${c.address.taluka})` : ''}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                                                    <Phone className="w-3.5 h-3.5 text-blue-400/70 flex-shrink-0" />
                                                    {c.phone}
                                                </div>
                                                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                                                    <Clock className="w-3.5 h-3.5 text-amber-400/70 flex-shrink-0" />
                                                    {c.operatingHours?.open} – {c.operatingHours?.close}
                                                </div>
                                            </div>

                                            {/* Service tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {c.servicesOffered?.slice(0, 3).map((s, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-md bg-primary/8 text-primary-light text-[11px] font-medium capitalize border border-primary/10">
                                                        {s.replace(/_/g, ' ')}
                                                    </span>
                                                ))}
                                                {c.servicesOffered?.length > 3 && (
                                                    <span className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[11px] text-slate-500 border border-white/[0.06]">
                                                        +{c.servicesOffered.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            {/* CTA */}
                                            <Link to="/login"
                                                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10
                                                    border border-primary/15 text-primary-light font-semibold text-sm
                                                    hover:from-primary/20 hover:to-secondary/20 hover:border-primary/25 transition-all group-hover:shadow-lg group-hover:shadow-primary/5">
                                                Book Now
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Centers;
