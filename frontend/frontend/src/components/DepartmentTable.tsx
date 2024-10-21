import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const DepartmentTable: React.FC = () => {
    const [departments, setDepartments] = useState<any[]>([]);
    const [editingDepartment, setEditingDepartment] = useState<number | null>(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [newDepartmentLocation, setNewDepartmentLocation] = useState(''); 

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:3000/departments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDepartments(data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "This department will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/departments/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error('Failed to delete department');
                }
                setDepartments(departments.filter(department => department.id !== id));
                Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting department:', error);
                Swal.fire('Error!', 'Failed to delete department.', 'error');
            }
        }
    };

    const handleUpdate = async (id: number) => {
        const confirmUpdate = await Swal.fire({
            title: 'Are you sure?',
            text: "This department's details will be updated!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, cancel!',
        });

        if (confirmUpdate.isConfirmed) {
            if (!newDepartmentName || !newDepartmentLocation) {
                Swal.fire('Warning!', 'Please enter valid department details.', 'warning');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/departments/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newDepartmentName, location: newDepartmentLocation }), 
                });

                if (!response.ok) {
                    throw new Error('Failed to update department');
                }

                setDepartments(departments.map(department => 
                    department.id === id ? { ...department, name: newDepartmentName, location: newDepartmentLocation } : department
                ));
                setEditingDepartment(null);
                setNewDepartmentName('');
                setNewDepartmentLocation(''); // Clear location
                Swal.fire('Updated!', 'Department details have been updated.', 'success');
            } catch (error) {
                console.error('Error updating department:', error);
                Swal.fire('Error!', 'Failed to update department.', 'error');
            }
        }
    };

    const startEditing = (department: any) => {
        setEditingDepartment(department.id);
        setNewDepartmentName(department.name);
        setNewDepartmentLocation(department.location); 
    };

    return (
        <div className='min-w-fit'>
            <h2 className="text-2xl font-bold mb-4">Department Details</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 border-b text-left">Department ID</th>
                        <th className="py-2 border-b text-left">Department Name</th>
                        <th className="py-2 border-b text-left">Location</th> 
                        <th className="py-2 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td className="py-2 border-b">{department.id}</td>
                            <td className="py-2 border-b">
                                {editingDepartment === department.id ? (
                                    <input
                                        type="text"
                                        value={newDepartmentName}
                                        onChange={(e) => setNewDepartmentName(e.target.value)}
                                        className="border rounded p-1"
                                    />
                                ) : (
                                    department.name
                                )}
                            </td>
                            <td className="py-2 border-b">
                                {editingDepartment === department.id ? (
                                    <input
                                        type="text"
                                        value={newDepartmentLocation}
                                        onChange={(e) => setNewDepartmentLocation(e.target.value)}
                                        className="border rounded p-1"
                                    />
                                ) : (
                                    department.location
                                )}
                            </td>
                            <td className="py-2 border-b">
                                {editingDepartment === department.id ? (
                                    <>
                                        <button 
                                            onClick={() => handleUpdate(department.id)}
                                            className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                                        >
                                            Save
                                        </button>
                                        <button 
                                            onClick={() => setEditingDepartment(null)} 
                                            className="bg-gray-300 rounded px-2 py-1"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => startEditing(department)} 
                                            className="bg-yellow-500 text-white rounded px-2 py-1 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(department.id)} 
                                            className="bg-red-500 text-white rounded px-2 py-1"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentTable;
