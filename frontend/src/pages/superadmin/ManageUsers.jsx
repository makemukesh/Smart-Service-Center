import { useState, useEffect } from 'react';
import API from '../../services/api';
import { Users, Search, Shield, Edit2, Trash2, ToggleLeft, ToggleRight, RefreshCw, UserCheck, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/auth/users');
            setUsers(data.users);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const updateRole = async (id, role) => {
        try {
            await API.put(`/auth/users/${id}`, { role });
            toast.success(`Role updated to ${role}`);
            fetchUsers();
        } catch (err) { toast.error('Failed to update role'); }
    };

    const toggleStatus = async (id, isActive) => {
        try {
            await API.put(`/auth/users/${id}`, { isActive: !isActive });
            toast.success(`User ${!isActive ? 'activated' : 'deactivated'}`);
            fetchUsers();
        } catch (err) { toast.error('Update failed'); }
    };

    const deleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await API.delete(`/auth/users/${id}`);
            toast.success('User deleted');
            fetchUsers();
        } catch (err) { toast.error('Delete failed'); }
    };

    const filtered = users.filter(u => {
        const matchSearch = !search ||
            u.name?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase());
        const matchRole = !roleFilter || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const getRoleBadge = (role) => {
        const map = {
            superadmin: 'bg-red-500/15 text-red-400 border-red-500/20',
            admin: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
            customer: 'bg-blue-500/15 text-blue-400 border-blue-500/20'
        };
        return map[role] || map.customer;
    };

    return (
        <div className="p-6 lg:p-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in-up">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                        <p className="text-slate-500 text-sm">{users.length} total users</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                       placeholder-slate-600 focus:border-primary/40 w-52" />
                    </div>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm
                     focus:border-primary/40 cursor-pointer">
                        <option value="">All Roles</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                    <button onClick={fetchUsers}
                        className="p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-500 hover:text-white
                     hover:bg-white/[0.08] transition-all">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Customers', count: users.filter(u => u.role === 'customer').length, color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/15', icon: Users },
                    { label: 'Admins', count: users.filter(u => u.role === 'admin').length, color: 'from-purple-500/10 to-pink-500/10 border-purple-500/15', icon: Shield },
                    { label: 'Active', count: users.filter(u => u.isActive !== false).length, color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/15', icon: UserCheck },
                ].map((s, i) => (
                    <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 border animate-fade-in-up`}
                        style={{ opacity: 0, animationDelay: `${i * 0.08}s` }}>
                        <s.icon className="w-5 h-5 text-slate-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{s.count}</p>
                        <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="glass-card rounded-2xl overflow-hidden animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.2s' }}>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-white">{u.name?.charAt(0)?.toUpperCase()}</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{u.name}</p>
                                                    <p className="text-[11px] text-slate-500">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-sm text-slate-400">{u.phone || '-'}</td>
                                        <td>
                                            <select value={u.role} onChange={(e) => updateRole(u._id, e.target.value)}
                                                className={`text-xs px-2.5 py-1 rounded-lg font-medium border cursor-pointer ${getRoleBadge(u.role)}
                                  bg-transparent focus:outline-none`}>
                                                <option value="customer">Customer</option>
                                                <option value="admin">Admin</option>
                                                <option value="superadmin">Super Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button onClick={() => toggleStatus(u._id, u.isActive !== false)}
                                                className="flex items-center gap-1.5 text-xs font-medium">
                                                {u.isActive !== false ? (
                                                    <><ToggleRight className="w-5 h-5 text-emerald-400" /> <span className="text-emerald-400">Active</span></>
                                                ) : (
                                                    <><ToggleLeft className="w-5 h-5 text-slate-500" /> <span className="text-slate-500">Inactive</span></>
                                                )}
                                            </button>
                                        </td>
                                        <td className="text-sm text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <button onClick={() => deleteUser(u._id)}
                                                className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete user">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filtered.length === 0 && (
                            <div className="text-center py-16">
                                <Users className="w-12 h-12 mx-auto text-slate-700 mb-3" />
                                <p className="text-slate-500 font-medium">No users found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
