"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../layouts';

const FarmersPage = () => {
    const [farmers, setFarmers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedFarmer, setSelectedFarmer] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleEditModal = (farmer: any) => {
        setSelectedFarmer(farmer);
        setIsEditModalOpen(true);
    };

    const handleSave = async (updatedData: any) => {
        try {
            await axios.put(`/api/farmer`, updatedData);
            fetchFarmers();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating farmer:', error);
        }
    };

    const handleDelete = async (fid: any) => {
        try {
            const result = await Swal.fire({
                title: 'SYSTEM!',
                text: 'แน่ใจไหมว่าต้องการลบ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่ ลบเลย!',
                cancelButtonText: 'ไม่!',
            });
            if (result.isConfirmed) {
                await axios.delete(`/api/farmer`, {
                    data: { fid }
                });
                fetchFarmers();
                Swal.fire('Deleted!', 'The farmer has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting farmer:', error);
            Swal.fire('Error!', 'Failed to delete the farmer.', 'error');
        }
    };
    useEffect(() => {
        fetchFarmers();
    }, [currentPage]);

    const fetchFarmers = async () => {
        try {
            const response = await axios.get(`/api/farmer`);
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
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
                <h1 className="text-3xl font-bold mb-4">Farmers Management</h1>

                {/* Farmer Table */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Group
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
                        {farmers.map((farmer) => (
                            <tr key={farmer.fid}>
                                <td className="px-6 py-4 whitespace-nowrap">{farmer.fullname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{farmer.phone_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{farmer.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{farmer.group}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEditModal(farmer)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(farmer.fid)}
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
                        className={`ml-2 ${farmers.length < 20 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={farmers.length < 20}
                    >
                        Next
                    </button>
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="relative bg-white p-8 rounded-lg max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Edit Farmer</h2>
                            {/* Edit Form */}
                            <form
                                onSubmit={(e: any) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        fid: selectedFarmer.fid,
                                        fullname: formData.get('fullname') as string,
                                        phone_number: formData.get('phone_number') as string,
                                        location: formData.get('location') as string,
                                        group: formData.get('group') as string,
                                    };
                                    handleSave(updatedData);
                                }}
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="col-span-2">
                                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullname"
                                            name="fullname"
                                            defaultValue={selectedFarmer?.fullname}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="col-span-2">
                                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone_number"
                                            name="phone_number"
                                            defaultValue={selectedFarmer?.phone_number}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Location */}
                                    <div className="col-span-2">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            defaultValue={selectedFarmer?.location}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Group Selection */}
                                    <div className="col-span-2">
                                        <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                                            Group
                                        </label>
                                        <select
                                            id="group"
                                            name="group"
                                            defaultValue={selectedFarmer?.group}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        >
                                            <option value="">Select Group</option>
                                            <option value="Group A">Group A</option>
                                            <option value="Group B">Group B</option>
                                            <option value="Group C">Group C</option>
                                            <option value="Group D">Group D</option>
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

export default FarmersPage;