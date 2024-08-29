import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiFileText, FiUser, FiMapPin, FiPhone, FiPercent, FiTrash } from 'react-icons/fi';
import { AiOutlineCalendar, AiOutlineDollar } from 'react-icons/ai';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../component/header';
import Footer from '../../component/Footer';
import Loader from '../../component/Loader';
import { url } from '../../API/Config';
const InvoiceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    dateOfIssue: '',
    partyBalance: '',
    buyer: {
      name: '',
      address: '',
      gstin: '',
      contact: '',
    },
    products: [
      {
        productname: '',
        Revrate: '',
        quantity: '',
        rate: '',
        GST: '',
        cgst: '',
        sgst: '',
        amount: ''
      },
    ],
    totals: {
      taxableAmount: '',
      cgstAmount: '',
      sgstAmount: '',
      roundOff: '',
      grandTotal: '',
    },
  });

  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    // Fetch product data from a dummy API or use a static array
    const fetchProductData = async () => {
      setIsLoading(true)
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        fetch(url+`api/product/allproducts`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setProductOptions(result)
            setIsLoading(false)
          })

          .catch((error) => console.error(error));
      } catch (e) {
        console.log(e.message)
        setIsLoading(false)
      }
    };

    fetchProductData();

    // Set today's date as the default for the date of issue
    const today = new Date().toISOString().split('T')[0];
    setInvoiceData(prevData => ({ ...prevData, dateOfIssue: today }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects by checking for the presence of a dot (.)
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setInvoiceData({
        ...invoiceData,
        [parentKey]: {
          ...invoiceData[parentKey],
          [childKey]: value,
        },
      });
    } else {
      setInvoiceData({ ...invoiceData, [name]: value });
    }
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...invoiceData.products];
    newProducts[index] = { ...newProducts[index], [name]: value };
    setInvoiceData({ ...invoiceData, products: newProducts });
  };

  const handleProductSelect = (index, e) => {
    const selectedProduct = productOptions.find(p => p.id === parseInt(e.target.value));
    const newProducts = [...invoiceData.products];
    newProducts[index] = {
      ...newProducts[index],
      productname: selectedProduct.productname,
      Revrate: selectedProduct.Revrate,
      rate: selectedProduct.rate,
      GST: selectedProduct.GST,
      amount: selectedProduct.amount,
    };
    setInvoiceData({ ...invoiceData, products: newProducts });
  };

  const addProduct = () => {
    setInvoiceData({
      ...invoiceData,
      products: [
        ...invoiceData.products,
        {
          productname: '',
          Revrate: '',
          quantity: '',
          rate: '',
          GST: '',
          cgst: '',
          sgst: '',
          amount: '',
        },
      ],
    });
  };

  const removeProduct = (index) => {
    const newProducts = [...invoiceData.products];
    newProducts.splice(index, 1);
    setInvoiceData({ ...invoiceData, products: newProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = invoiceData.products.map(product => ({
      ...product,
      amount: (product.rate * product.quantity).toFixed(2),  // Ensure one decimal place
    }));

    // Calculate the total amount by summing all product amounts
    const totalAmount = updatedProducts.reduce((total, product) => total + parseFloat(product.amount), 0);

    // Calculate CGST and SGST amounts (9% each)
    const cgstAmount = totalAmount * 0.09;
    const sgstAmount = totalAmount * 0.09;

    // Calculate the grand total before rounding off
    const preRoundGrandTotal = totalAmount + cgstAmount + sgstAmount;

    // Calculate the round-off amount to make the grand total a whole number
    const roundOff = Math.ceil(preRoundGrandTotal) - preRoundGrandTotal;

    // Calculate the final grand total by adding the round-off amount
    const grandTotal = preRoundGrandTotal + roundOff;

    // Update the invoice data with the calculated values
    const updatedInvoiceData = {
      ...invoiceData,
      products: updatedProducts,
      totals: {
        taxableAmount: totalAmount.toFixed(2),
        cgstAmount: cgstAmount.toFixed(2),
        sgstAmount: sgstAmount.toFixed(2),
        roundOff: roundOff.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
        check: preRoundGrandTotal.toFixed(2),
      },
    };


    navigate('/invoices', { state: { invoiceData: updatedInvoiceData } });
  };

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-200 ">
      <Header />
      <Loader
        message={`Please Wait..`}
        isLoading={isLoading}
      />
      <div className='p-4 '>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mt-14">
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h1 className="text-lg font-bold flex items-center">
              <FiFileText className="mr-2" /> Create Invoice
            </h1>
          </div>
          <form  className="p-6 space-y-6">
          <div className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-semibold mb-2">Buyer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyername">
                    Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    // type="number"
                    id="buyername"
                    name="buyername"
                    // value={invoiceData.buyer.name}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyeraddress">
                    Address <span className='text-red-500'>*</span>
                  </label>
                  <input
                    // type="number"
                    id="buyeraddress"
                    name="buyeraddress"
                    // value={invoiceData.buyer.address}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyergstin">
                    GST No. <span className='text-red-500'>*</span>
                  </label>
                  <input
                    // type="number"
                    id="buyergstin"
                    name="buyergstin"
                    // value={invoiceData.buyer.gstin}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter GST"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="buyercontact">
                    Contact <span className='text-red-500'>*</span>
                  </label>
                  <input
                    // type="number"
                    id="buyercontact"
                    name="buyercontact"
                    // value={invoiceData.buyer.contact}
                    // onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter contact"
                  />
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="border p-4 rounded-lg shadow-md bg-white">
              <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
              {invoiceData.products.map((product, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-3">
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                    <select
                      value={productOptions.find(p => p.productname === product.productname)?.id || ''}
                      onChange={(e) => handleProductSelect(index, e)}
                      className="w-full bg-transparent focus:outline-none text-sm"
                    >
                      <option value="" disabled>Select Product</option>
                      {productOptions.map((option) => (
                        <option key={option.id} value={option.id}>{option.productname}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                    <input
                      disabled
                      type="text"
                      name="Revrate"
                      value={product.Revrate}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="Rev. Rate"
                      className="w-full bg-transparent focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="Quantity"
                      className="w-full bg-transparent focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                    <input
                      disabled
                      type="number"
                      name="rate"
                      value={product.rate}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="Rate"
                      className="w-full bg-transparent focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                    <input
                      disabled
                      name="GST"
                      value={product.GST}
                      onChange={(e) => handleProductChange(index, e)}
                      placeholder="GST %"
                      className="w-full bg-transparent focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50 justify-center">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center mt-6 text-blue-600 hover:text-blue-800"
              >
                <FiPlusCircle className="mr-2" /> Add Product
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Get Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvoiceForm;
