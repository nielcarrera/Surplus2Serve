import React from 'react';

function DataTable() {
  const tableData = [
    { id: 1, category: 'Category A', total: 100, approved: 80, denied: 20 },
    { id: 2, category: 'Category B', total: 150, approved: 120, denied: 30 },
    { id: 3, category: 'Category C', total: 200, approved: 170, denied: 30 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table table-auto border-collapse w-full">
        {/* head */}
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Approved</th>
            <th className="px-4 py-2">Denied</th>
          </tr>
        </thead>
        <tbody>
          {/* Traverse through the tableData array and create rows */}
          {tableData.map((item) => (
            <tr key={item.id} className="bg-indigo-900 text-white hover:bg-indigo-700">
              <th className="px-4 py-2">{item.id}</th>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.total}</td>
              <td className="px-4 py-2 text-green-400">{item.approved}</td>
              <td className="px-4 py-2 text-red-400">{item.denied}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
