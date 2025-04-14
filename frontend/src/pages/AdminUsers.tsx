import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Mail, Lock, Calendar, User, Image } from 'lucide-react'; 
import { getAllUsers } from '../services/signupService';

export interface UserObject {
    _id:string,
    name: string;
    email: string;
    photo: string | null;
    dob: string;
    password: string;
    repassword: string;
    role: string;
}
const UserManager: React.FC = () => {
    
    const [users, setUsers] = useState<UserObject[]>([]);
    const [formData, setFormData] = useState<any>({
        name: '',
        email: '',
        role: '',
        dob: '',
        password: '',
        repassword: '',
        photo: null,
    });
    const [editingId, setEditingId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || formData.password !== formData.repassword) return;

        if (editingId !== null) {
            setUsers((prev: any) =>
                prev.map((user: any) =>
                    user.id === editingId ? { ...user, name: formData.name, email: formData.email, role: formData.role, dob: formData.dob, password: formData.password, photo: formData.photo } : user
                )
            );
            setEditingId('');
        } else {
            const newUser: any = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                dob: formData.dob,
                password: formData.password,
                repassword: formData.repassword,
                photo: formData.photo,
            };
            setUsers([...users, newUser]);
        }

        setFormData({ name: '', email: '', role: '', dob: '', password: '', repassword: '', photo: null });
    };

    const handleEdit = (user: UserObject) => {
        setFormData({ name: user.name, email: user.email, role: user.role, dob: user.dob, password: '', repassword: '', photo: user.photo });
        setEditingId(user._id);
    };

    const handleDelete = (id: string) => {
        setUsers((prev:any) => prev.filter((u:any) => u._id !== id));
        if (editingId === id) {
            setEditingId('');
            setFormData({ name: '', email: '', role: '', dob: '', password: '', repassword: '', photo: null });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev:any) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev:any) => ({ ...prev, photo: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        async function getUsers() {
            const token = localStorage.getItem('token');
            const response = await getAllUsers(token);
    console.log("useer Responses: ",response);
            if (Array.isArray(response)) {
                setUsers(response);
            } else if (Array.isArray(response?.data)) {
                setUsers(response.data);
            } else {
                console.error("Invalid user data:", response);
                setUsers([]);
            }
        }
    
        getUsers();
    }, []);
    

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900">{editingId !== null ? 'Edit User' : 'Create an Account'}</h2>
                <p className="mt-2 text-sm text-gray-600">Join our platform and manage users effectively</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role */}
                <div className="space-y-4">
                    <div>
                        <div className="relative">
                            <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                required
                            >
                                <option value="">Select a Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Photo */}
                    <div className="relative">
                        <Image className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleImageUpload(file);
                                }
                            }}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* DOB */}
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            name="dob"
                            required
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Re-enter Password */}
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="repassword"
                            required
                            placeholder="Re-enter Password"
                            value={formData.repassword}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 text-white font-medium rounded-lg bg-gradient-to-r from-orange-400 to-purple-500 hover:opacity-90 transition duration-300"
                >
                    {editingId !== null ? 'Update User' : 'Create User'}
                </button>
            </form>

            {/* User List */}
            <h3 className="text-xl font-semibold mb-4 mt-8">User List</h3>
            {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManager;
