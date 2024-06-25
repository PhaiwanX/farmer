"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AdminLayout from '../layouts';

const UsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleEditModal = (user: any) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleSave = async (updatedData: any) => {
        try {
            await axios.put(`/api/user`, updatedData);
            fetchUsers();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (uid: any) => {
        try {
            const result = await Swal.fire({
                title: 'Confirm Delete',
                text: 'Are you sure you want to delete this user?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
            });
            if (result.isConfirmed) {
                await axios.delete(`/api/user`, {
                    data: { uid }
                });
                fetchUsers();
                Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error!', 'Failed to delete the user.', 'error');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`/api/user`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Pagination logic
    const handlePageNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePageBack = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <AdminLayout>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">Users Management</h1>

                {/* User Table */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Group
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.uid}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.group}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEditModal(user)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(user.uid)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handlePageBack}
                        className={`mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handlePageNext}
                        className={`ml-2 ${users.length < 20 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={users.length < 20}
                    >
                        Next
                    </button>
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="relative bg-white p-8 rounded-lg max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                            {/* Edit Form */}
                            <form
                                onSubmit={(e: any) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        uid: selectedUser.uid,
                                        name: formData.get('name') as string,
                                        group: formData.get('group') as string,
                                        role: formData.get('role') as string,
                                    };
                                    handleSave(updatedData);
                                }}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            defaultValue={selectedUser?.name}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Group */}
                                    <div className="col-span-2">
                                        <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                                            Group
                                        </label>
                                        <input
                                            type="text"
                                            id="group"
                                            name="group"
                                            defaultValue={selectedUser?.group}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Role */}
                                    <div className="col-span-2">
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            defaultValue={selectedUser?.role}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UsersPage;
