import { useState, useEffect } from 'react';
import API from '../services/api';
import { MapPin, ChevronDown } from 'lucide-react';

const LocationFilter = ({ values = {}, onChange, mode = 'form' }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [villages, setVillages] = useState([]);

    // Fetch states on mount
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const { data } = await API.get('/locations/states');
                setStates(data.states || []);
            } catch (err) { console.error('Failed to fetch states', err); }
        };
        fetchStates();
    }, []);

    // Fetch cities when state changes
    useEffect(() => {
        if (!values.state) { setCities([]); return; }
        const fetchCities = async () => {
            try {
                const { data } = await API.get(`/locations/cities?state=${encodeURIComponent(values.state)}`);
                setCities(data.cities || []);
            } catch (err) { console.error('Failed to fetch cities', err); }
        };
        fetchCities();
    }, [values.state]);

    // Fetch talukas when city changes
    useEffect(() => {
        if (!values.state || !values.city) { setTalukas([]); return; }
        const fetchTalukas = async () => {
            try {
                const { data } = await API.get(`/locations/talukas?state=${encodeURIComponent(values.state)}&city=${encodeURIComponent(values.city)}`);
                setTalukas(data.talukas || []);
            } catch (err) { console.error('Failed to fetch talukas', err); }
        };
        fetchTalukas();
    }, [values.state, values.city]);

    // Fetch villages when taluka changes
    useEffect(() => {
        if (!values.state || !values.city || !values.taluka) { setVillages([]); return; }
        const fetchVillages = async () => {
            try {
                const { data } = await API.get(`/locations/villages?state=${encodeURIComponent(values.state)}&city=${encodeURIComponent(values.city)}&taluka=${encodeURIComponent(values.taluka)}`);
                setVillages(data.villages || []);
            } catch (err) { console.error('Failed to fetch villages', err); }
        };
        fetchVillages();
    }, [values.state, values.city, values.taluka]);

    const handleChange = (field, value) => {
        const updates = { ...values, [field]: value };
        // Reset child fields when parent changes
        if (field === 'state') {
            updates.city = '';
            updates.taluka = '';
            updates.village = '';
        } else if (field === 'city') {
            updates.taluka = '';
            updates.village = '';
        } else if (field === 'taluka') {
            updates.village = '';
        }
        onChange(updates);
    };

    const isFilter = mode === 'filter';

    const selectClass = isFilter
        ? 'px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-primary/40 cursor-pointer min-w-[130px]'
        : 'w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-primary/50 transition-all appearance-none cursor-pointer';

    const fields = [
        { key: 'state', label: 'State', options: states, placeholder: isFilter ? 'All States' : 'Select State' },
        { key: 'city', label: 'City', options: cities, placeholder: isFilter ? 'All Cities' : 'Select City', disabled: !values.state },
        { key: 'taluka', label: 'Taluka', options: talukas, placeholder: isFilter ? 'All Talukas' : 'Select Taluka', disabled: !values.city },
        { key: 'village', label: 'Village', options: villages, placeholder: isFilter ? 'All Villages' : 'Select Village', disabled: !values.taluka },
    ];

    if (isFilter) {
        return (
            <div className="flex items-center gap-3 flex-wrap">
                {fields.map(({ key, label, options, placeholder, disabled }) => (
                    <select
                        key={key}
                        value={values[key] || ''}
                        onChange={(e) => handleChange(key, e.target.value)}
                        disabled={disabled}
                        className={`${selectClass} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ))}
            </div>
        );
    }

    // Form mode
    return (
        <div className="grid grid-cols-2 gap-4">
            {fields.map(({ key, label, options, placeholder, disabled }) => (
                <div key={key}>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <select
                            value={values[key] || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            disabled={disabled}
                            className={`${selectClass} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                            <option value="">{placeholder}</option>
                            {options.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LocationFilter;
