import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const AllUsers = () => {
    const { axios, user: activeUser } = useAppContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/owner/all-users');

            if (data.success) {
                setUsers(data.users);
                toast.success('Users loaded successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">All Users</h1>
                <p className="text-gray-600 mt-1">View all registered users on the platform</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-borderColor rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="absolute left-3 top-3 w-5 h-5 opacity-50"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-600 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-600 text-sm">Active Today</p>
                    <p className="text-3xl font-bold text-green-600">
                        {users.filter(u => u.isActive).length}
                    </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <p className="text-gray-600 text-sm">Filtered Results</p>
                    <p className="text-3xl font-bold text-purple-600">{filteredUsers.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-gray-600 text-sm">Active User</p>
                    {activeUser ? (
                        <div className="flex items-center mt-2">
                            <img
                                src={activeUser.image || assets.user_profile}
                                alt={activeUser.name}
                                className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-800">{activeUser.name}</p>
                                <p className="text-xs text-gray-600">{activeUser.email}</p>
                                <p className={`text-xs font-semibold mt-1 ${activeUser.isActive ? 'text-green-700' : 'text-gray-700'}`}>
                                    {activeUser.isActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-2">No active user</p>
                    )}
                </div>
            </div>

            {/* Users Table */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Loading users...</p>
                </div>
            ) : filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-borderColor">
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Profile</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className={`border-b border-borderColor hover:bg-gray-50 transition-colors ${activeUser && user._id === activeUser._id ? 'bg-yellow-50' : ''}`}
                                >
                                    <td className="px-4 py-3">
                                        <img
                                            src={user.image || assets.user_profile}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                                        {user.name}
                                        {activeUser && user._id === activeUser._id && (
                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">You</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{user.phone || 'N/A'}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <img src={assets.users_icon} alt="no users" className="w-16 h-16 opacity-40 mb-3" />
                    <p className="text-gray-500">
                        {searchTerm ? 'No users match your search' : 'No users found'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllUsers;
