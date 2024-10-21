import React, { useEffect, useState } from 'react';

const EmployeeListWDEpartment: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<any[]>([]); // Renamed the state variable to avoid conflict

  // Fetch employees with department data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees/employees-with-department');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employees with Roles and Departments</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 border-b">First Name</th>
            <th className="py-2 border-b">Last Name</th>
            <th className="py-2 border-b">Role</th>
            <th className="py-2 border-b">Department</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id}>
              <td className="py-2 border-b">{employee.first_name}</td>
              <td className="py-2 border-b">{employee.last_name}</td>
              <td className="py-2 border-b">{employee.position}</td>
              <td className="py-2 border-b">{employee.department ? employee.department.name : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListWDEpartment;
