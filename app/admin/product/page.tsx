"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import AdminLayout from '../layouts';

const ProductsPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const handleEditModal = (product: any) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleAddModal = () => {
        setSelectedProduct(null);
        setIsAddModalOpen(true);
    };

    const handleSave = async (updatedData: any) => {
        try {
            await axios.put(`/api/product`, updatedData);
            fetchProducts();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleAdd = async (newData: any) => {
        try {
            await axios.post(`/api/product`, newData);
            fetchProducts();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDelete = async (pid: any) => {
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
                await axios.delete(`/api/product`, {
                    data: { pid }
                });
                fetchProducts();
                Swal.fire('Deleted!', 'The product has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/api/product`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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
                <h1 className="text-3xl font-bold mb-4">Products Management</h1>

                <div className="mb-4">
                    <button
                        onClick={handleAddModal}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Add Product
                    </button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Link
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
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
                        {products.map((product) => (
                            <tr key={product.pid}>
                                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.link}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{product.img}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEditModal(product)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleDelete(product.pid)}
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
                        className={`ml-2 ${products.length < 20 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={products.length < 20}
                    >
                        Next
                    </button>
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="relative bg-white p-8 rounded-lg w-full max-w-lg">
                            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                            {/* Edit Form */}
                            <form
                                onSubmit={(e: any) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        pid: selectedProduct.pid,
                                        name: formData.get('name') as string,
                                        description: formData.get('description') as string,
                                        price: formData.get('price') as string,
                                        link: formData.get('link') as string,
                                        img: formData.get('img') as string,
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
                                            defaultValue={selectedProduct?.name}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            defaultValue={selectedProduct?.description}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            defaultValue={selectedProduct?.price}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Link */}
                                    <div className="col-span-2">
                                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                            Link
                                        </label>
                                        <input
                                            type="text"
                                            id="link"
                                            name="link"
                                            defaultValue={selectedProduct?.link}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="Img" className="block text-sm font-medium text-gray-700">
                                            Img
                                        </label>
                                        <input
                                            type="text"
                                            id="Img"
                                            name="Img"
                                            defaultValue={selectedProduct?.img}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 overflow-y-auto">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="relative bg-white p-8 rounded-lg  w-full max-w-lg">
                            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                            {/* Add Form */}
                            <form
                                onSubmit={(e: any) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const newData = {
                                        name: formData.get('name') as string,
                                        description: formData.get('description') as string,
                                        price: formData.get('price') as string,
                                        link: formData.get('link') as string,
                                    };
                                    handleAdd(newData);
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
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2">
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>

                                    {/* Link */}
                                    <div className="col-span-2">
                                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                                            Link
                                        </label>
                                        <input
                                            type="text"
                                            id="link"
                                            name="link"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Add
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

export default ProductsPage;
