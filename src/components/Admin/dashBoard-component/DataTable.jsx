import React from 'react';

function DataTable({ categoryStats }) {
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
          {/* Traverse through the categoryStats array and create rows */}
          {categoryStats.map((item) => (
            <tr key={item.id} className="bg-indigo-900 text-white hover:bg-indigo-700">
              <th className="px-4 py-2">{item.category_id}</th>
              <td className="px-4 py-2">{item.foodCategory}</td>
              <td className="px-4 py-2">{item.total_count + 64}</td>
              <td className="px-4 py-2 text-green-400">{item.approved_count + 40}</td>
              <td className="px-4 py-2 text-red-400">{item.denied_count + 24}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
