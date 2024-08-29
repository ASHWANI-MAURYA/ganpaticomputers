import React from 'react';
import Header from '../../component/header'; // Adjust the import path as necessary
import Footer from '../../component/Footer';

const PaidInvoices = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto flex-grow p-8 mt-14">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Paid Invoices</h2>
          <p className="text-gray-600 mb-6">Here you can view all your invoices.</p>

          {/* Example Table */}
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border-b text-left">Invoice Number</th>
                <th className="p-3 border-b text-left">Date</th>
                <th className="p-3 border-b text-left">Amount</th>
                <th className="p-3 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this with your data */}
              <tr>
                <td className="p-3 border-b">INV-001</td>
                <td className="p-3 border-b">2024-08-20</td>
                <td className="p-3 border-b">$150.00</td>
                <td className="p-3 border-b">Paid</td>
              </tr>
              <tr>
                <td className="p-3 border-b">INV-002</td>
                <td className="p-3 border-b">2024-08-22</td>
                <td className="p-3 border-b">$200.00</td>
                <td className="p-3 border-b">Unpaid</td>
              </tr>
              {/* More rows as needed */}
            </tbody>
          </table>
        </section>
      </main>

      <Footer/>
    </div>
  );
};

export default PaidInvoices;
