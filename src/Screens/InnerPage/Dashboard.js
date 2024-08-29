// src/App.js
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header'; // Adjust the import path as needed
import Footer from '../../component/Footer';

export default function Home() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // const raw = JSON.stringify({
    //   "password": "jkjk",
    //   "email": "jkjk",
    //   "name": "jkjkjk"
    // });

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow"
    };

    fetch("https://ropartestingbackend-1.onrender.com/api/users/test", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  } catch (e) {
    console.log(e)
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-8 mt-14">
        {/* Buttons for Invoice and Stock */}
        <div className="mb-6 flex justify-end space-x-4">
          <Link to="/invoice/new" className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
            Create New Invoice
          </Link>
          <Link to="/invoice/edit" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200">
            Edit Invoice
          </Link>
        </div>

        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to GANPATI COMPUTERS</h2>
          <p className="text-gray-600 mb-6">Manage your invoices, track payments, and view billing history..</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/totalInvoice" className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Total Invoices</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">123</p>
            </Link>
            <Link to="/paidInvoices" className="p-4 bg-green-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Paid Invoices</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">95</p>
            </Link>
            <Link to="/unpaidInvoice" className="p-4 bg-red-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Unpaid Invoices</h3>
              <p className="text-4xl font-bold text-red-600 mt-2">28</p>
            </Link>
          </div>

          {/* Stock Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/stockDetails" className="p-4 bg-yellow-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Stock Item 1</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">50 units</p>
            </Link>
            <Link to="/stockDetails" className="p-4 bg-yellow-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Stock Item 2</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">30 units</p>
            </Link>
            <Link to="/stockDetails" className="p-4 bg-yellow-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Stock Item 3</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">20 units</p>
            </Link>
          </div>
        </section>

        {/* <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="text-gray-600">
            <li className="mb-2">Invoice #00123 marked as paid</li>
            <li className="mb-2">Invoice #00120 sent to customer</li>
            <li className="mb-2">Invoice #00118 overdue</li>
          </ul>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
