// src/pages/AddStock.js
import React, { useState } from 'react';
import Header from '../../component/header'; // Adjust the import path as needed
import Footer from '../../component/Footer'; // Adjust the import path as needed
import { FiFileText } from 'react-icons/fi';
import Loader from '../../component/Loader';
import { url } from '../../API/Config';
const AddStock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    Revrate: '',
    quantity: '',
    rate: '',
    GST: '',
    remark: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    if (formData.productname == "" ||
      formData.description == "" ||
      formData.Revrate == "" ||
      formData.quantity == "" ||
      formData.rate == "" ||
      formData.GST == "") {
      alert('all fields are required')
      return
    }
    e.preventDefault();
    // Handle form submission
    setIsLoading(true)
    console.log('Form Data:', formData);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "productname": formData.productname,
        "description": formData.description,
        "Revrate": formData.Revrate,
        "quantity": formData.quantity,
        "rate": formData.rate,
        "GST": formData.GST,
        "remark": formData.remark
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(url+`api/product/addproduct`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setIsLoading(false)
          console.log('result', result)
          if (result.message == 'Product with this Name already exists') {
            alert(result.message)
          }
          if (result.message == 'Product added successfully') {
            alert(result.message)
            formData.productname = "";
            formData.description = "";
            formData.Revrate = "";
            formData.quantity = "";
            formData.rate = "";
            formData.GST = "";
            formData.remark = "";


          }
        })
        .catch((error) => console.error(error));
    } catch (e) {
      setIsLoading(false)
      alert('something went wrong')
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      <Header />
      <Loader
        message={`Please Wait..`}
        isLoading={isLoading}
      />
      <main className="flex-grow bg-gray-100 py-10 p-8 mt-14">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden min-h-screen">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h1 className="text-lg font-bold flex items-center">
              <FiFileText className="mr-2" /> Add New Stock
            </h1>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="productname">
                  Product Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  id="productname"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                  Description <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="quantity">
                  Quantity <span className='text-red-500'>*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="rate">
                  Rate <span className='text-red-500'>*</span>
                </label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rate"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="Revrate">
                  Rev. rate <span className='text-red-500'>*</span>
                </label>
                <input
                  type="number"
                  id="Revrate"
                  name="Revrate"
                  value={formData.Revrate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Revrate"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="GST">
                  GST <span className='text-red-500'>*</span>
                </label>
                <input
                  type="text"
                  id="GST"
                  name="GST"
                  value={formData.GST}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter GST"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="remark">
                  Remark
                </label>
                <input
                  type="text"
                  id="remark"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter remark"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Add Stock
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddStock;
