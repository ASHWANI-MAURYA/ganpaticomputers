import React from 'react';
import { useLocation } from "react-router-dom";

const InvoicePrint = () => {
    const location = useLocation();
    const { invoiceData } = location.state;
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="text-gray-900 min-h-screen flex justify-center">
            <div className="max-w-4xl w-full overflow-hidden shadow-lg">
                {/* Header Section */}
                <div className="text-center p-4 bg-gray-300">
                    <h2 className="text-lg font-bold text-gray-800">TAX INVOICE</h2>
                    <p className="text-sm font-light text-gray-700">ORIGINAL FOR RECIPIENT</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-200">
                    <div>
                        <h1 className="text-lg font-extrabold text-gray-800">GANPATI COMPUTERS</h1>
                        <p className="text-sm text-gray-600">NEAR NAU GJA PEER, MATA RANI ROAD, COLLEGE ROAD, ROPAR</p>
                        <p className="text-sm text-gray-600">RUPNAGAR (PUNJAB)</p>
                        <p className="text-sm text-gray-600">Phone: 9988893537</p>
                        <p className="text-sm text-gray-600">E-Mail: <span className="text-indigo-600">testingemail.com</span></p>
                    </div>
                    <div className="text-right">
                        <p className=" text-sm text-gray-800 font-medium">GSTIN: <span className="font-semibold text-sm">03BIKPK3166L1Z3</span></p>
                        <p className="text-sm text-gray-800 font-medium">PAN: <span className="font-semibold text-sm">AAAHJ4130L</span></p>
                    </div>
                </div>

                {/* Tax Invoice Center */}


                {/* Invoice Number Section */}
                <div className="p-4 border-t-2 border-b-2 border-gray-300 flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">Invoice No.: {invoiceData.invoiceNumber}</p>
                    <p className="text-sm font-semibold text-gray-800">Dated: <span className="font-semibold">{currentDate}</span></p>
                </div>

                {/* Address Section */}
                <div className="p-4 bg-gray-100">
                    <div className="flex justify-between">
                        <div className="w-1/2 pr-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-900">Name and Address of Buyer:</h3>
                            <div className="  p-2 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-700">M/s. {invoiceData.buyer.name}</p>
                                <p className="text-sm text-gray-700">Address: {invoiceData.buyer.address}</p>
                                <p className="text-sm text-gray-700">GSTIN: {invoiceData.buyer.gstin}</p>
                                <p className="text-sm text-gray-700">Phone: {invoiceData.buyer.contact}</p>
                            </div>
                        </div>
                        <div className="w-1/2 pl-4">
                            <h3 className="text-sm font-semibold mb-2 text-gray-900">Ship To:</h3>
                            <div className=" p-2 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-700">M/s. {invoiceData.buyer.name}</p>
                                <p className="text-sm text-gray-700">Address: {invoiceData.buyer.address}</p>
                                <p className="text-sm text-gray-700">GSTIN: {invoiceData.buyer.gstin}</p>
                                <p className="text-sm text-gray-700">Phone: {invoiceData.buyer.contact}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Table */}
                <div className="p-2">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className=" border-b text-left text-sm">Description of Goods</th>
                                {/* <th className=" border-b text-left text-sm">HSN/SAC</th> */}
                                <th className=" border-b text-center text-sm">Qty.</th>
                                <th className=" border-b text-center text-sm">Unit</th>
                                <th className=" border-b text-right text-sm">Rate</th>
                                <th className=" border-b text-right text-sm">Rev. Rate</th>
                                <th className=" border-b text-center text-sm">GST (%)</th>
                                <th className=" border-b text-right text-sm">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {invoiceData.products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition-colors">
                                    <td className=" border-b text-left text-sm">{product.description}</td>
                                    {/* <td className=" border-b text-left text-sm">{product.hsnSac}</td> */}
                                    <td className=" border-b text-center text-sm">{product.quantity}</td>
                                    <td className=" border-b text-center text-sm">{product.unit}</td>
                                    <td className=" border-b text-right text-sm">{product.rate}</td>
                                    <td className=" border-b text-right text-sm">{product.Revrate}</td>
                                    <td className=" border-b text-center text-sm">{product.GST} %</td>
                                    <td className=" border-b text-right text-sm">₹{product.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals Section */}
                    <div className="flex justify-between">
                        <div className="w-1/1">
                            <div className="">
                                <span className="text-gray-800 text-sm"><span className='text-gray-800 text-sm font-bold'>Note</span>: Reverse charge not applicable</span>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="">
                                <p className="flex justify-between">
                                    <span className="text-sm text-gray-800 font-bold">Total Amount:</span>
                                    <span className="text-gray-800 text-sm">₹{invoiceData.totals.taxableAmount}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-sm text-gray-800 font-bold">CGST Amount:</span>
                                    <span className="text-gray-800 text-sm">₹{invoiceData.totals.cgstAmount}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-sm text-gray-800 font-bold">SGST Amount:</span>
                                    <span className="text-gray-800 text-sm">₹{invoiceData.totals.sgstAmount}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span className="text-sm text-gray-800 font-bold">Round Off:</span>
                                    <span className="text-gray-800 text-sm">₹{invoiceData.totals.roundOff}</span>
                                </p>
                                <p className="flex justify-between font-bold text-lg text-gray-900">
                                    <span className='text-sm'>Grand Total:</span>
                                    <span className='text-sm'>₹{invoiceData.totals.grandTotal}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="font-bold text-sm text-gray-800 border-b border-t">Amount (in words): Rs. ELEVEN THOUSAND FOUR HUNDRED FIFTY TWO ONLY.</p>
                </div>

                {/* Footer Section */}
                <div className="pl-4 pr-2">
                    <div className="mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">Bank Details:</h3>
                        <p className="text-sm text-gray-700">Bank: HDFC BANK LTD</p>
                        <p className="text-sm text-gray-700">A/C: 50200052390607</p>
                        <p className="text-sm text-gray-700">IFSC: HDFC0000046</p>
                    </div>
                    <div className="mb-1">
                        <h3 className="text-sm text-sm font-semibold text-gray-900">Terms & Conditions:</h3>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            <li>All disputes subject to Jalandhar jurisdiction only.</li>
                            <li>Goods once sold will not be taken back.</li>
                            <li>Interest @24% p.a. shall be charged if payment is not made within 30 days.</li>
                            <li>Our responsibility ceases once the goods leave our premises.</li>
                        </ul>
                    </div>
                    <div className="flex justify-between mt-6">
                        <p className="text-gray-700 font-semibold text-sm">Receiver's Signature</p>
                        <p className="text-gray-700 font-semibold text-sm">For GANPATI COMPUTERS</p>
                    </div>
                </div>
              <div className='flex justify-center mt-5 mb-5'>
                  <button
                    // onClick={onPrint}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Print PDF
                </button>
              </div>
            </div>
        </div>
    );
};

export default InvoicePrint;
