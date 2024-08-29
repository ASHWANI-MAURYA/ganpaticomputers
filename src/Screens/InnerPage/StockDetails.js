// src/pages/StockDetails.js
import React from 'react';
import Header from '../../component/header'; // Adjust the import path as needed
import Footer from '../../component/Footer';

export default function StockDetails() {
  const stockData = [
    { id: 1, name: 'Stock Item 1', quantity: 50, lastUpdated: '2024-08-27' },
    { id: 2, name: 'Stock Item 2', quantity: 30, lastUpdated: '2024-08-25' },
    { id: 3, name: 'Stock Item 3', quantity: 20, lastUpdated: '2024-08-22' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-8 mt-14">
        {/* Page Title */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Stock Details</h2>
          <p className="text-gray-600 mb-6">View and manage stock information for your inventory.</p>
        </section>

        {/* Stock Details */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Stock Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockData.map(stock => (
              <div key={stock.id} className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{stock.name}</h4>
                <p className="text-gray-700 mb-2">Quantity: <span className="font-bold text-blue-600">{stock.quantity}</span></p>
                <p className="text-gray-500">Last Updated: <span className="font-bold text-gray-700">{stock.lastUpdated}</span></p>
                <button  className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">Update Stock</button>
              </div>
            ))}
          </div>
        </section>

        {/* Stock Summary */}
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Stock Summary</h3>
          <div className="flex flex-wrap gap-6">
            <div className="p-6 bg-green-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Total Items</h4>
              <p className="text-4xl font-bold text-green-600">100</p>
            </div>
            <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Low Stock</h4>
              <p className="text-4xl font-bold text-yellow-600">20</p>
            </div>
            <div className="p-6 bg-red-100 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Out of Stock</h4>
              <p className="text-4xl font-bold text-red-600">5</p>
            </div>
          </div>
        </section>

        {/* Recent Updates */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">Recent Updates</h3>
          <ul className="text-gray-600">
            <li className="mb-2">Stock Item 1 updated with new quantity</li>
            <li className="mb-2">Stock Item 2 reordered</li>
            <li className="mb-2">Stock Item 3 marked as low</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
