import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiFileText, FiUser, FiMapPin, FiPhone, FiPercent, FiTrash } from 'react-icons/fi';
import { AiOutlineCalendar, AiOutlineDollar } from 'react-icons/ai';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../component/header';
import Footer from '../../component/Footer';
const InvoiceForm = () => {
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
        description: '',
        Revrate: '',
        quantity: '',
        unit: '',
        rate: '',
        GST: '',
        cgst: '',
        sgst: '',
        amount: '',
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
      const data = [
        { id: 1, description: 'USB cable', Revrate: '1234', unit: 'PCS', rate: 100, GST: 18, amount: 100 },
        { id: 2, description: 'Product 2', Revrate: '5678', unit: 'PCS', rate: 200, GST: 18, amount: 200 },
        { id: 3, description: 'Product 3', Revrate: '9101', unit: 'PCS', rate: 300, GST: 18, amount: 300 },
      ];
      setProductOptions(data);
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
      description: selectedProduct.description,
      Revrate: selectedProduct.Revrate,
      unit: selectedProduct.unit,
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
          description: '',
          Revrate: '',
          quantity: '',
          unit: '',
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
    // console.log('Invoice Data:', invoiceData);
    navigate('/invoices', { state: { invoiceData } });
  };

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-200 ">
      <Header/>
      <div className='p-4'>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden min-h-screen">
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-4xl font-bold flex items-center">
            <FiFileText className="mr-2" /> Create Invoice
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
              <AiOutlineCalendar className="mr-3 text-gray-400" />
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                placeholder="Invoice Number"
                className="w-full bg-transparent focus:outline-none text-lg"
              />
            </div>

            <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
              <AiOutlineCalendar className="mr-3 text-gray-400" />
              <input
                type="date"
                name="dateOfIssue"
                value={invoiceData.dateOfIssue}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none text-lg"
              />
            </div>
          </div> */}

          <div className="border p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Buyer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
                <FiUser className="mr-3 text-gray-400" />
                <input
                  type="text"
                  name="buyer.name"
                  value={invoiceData.buyer.name}
                  onChange={handleInputChange}
                  placeholder="Buyer Name"
                  className="w-full bg-transparent focus:outline-none text-lg"
                />
              </div>
              <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
                <FiMapPin className="mr-3 text-gray-400" />
                <input
                  type="text"
                  name="buyer.address"
                  value={invoiceData.buyer.address}
                  onChange={handleInputChange}
                  placeholder="Buyer Address"
                  className="w-full bg-transparent focus:outline-none text-lg"
                />
              </div>
              <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
                <FiUser className="mr-3 text-gray-400" />
                <input
                  type="text"
                  name="buyer.gstin"
                  value={invoiceData.buyer.gstin}
                  onChange={handleInputChange}
                  placeholder="Buyer GSTIN"
                  className="w-full bg-transparent focus:outline-none text-lg"
                />
              </div>
              <div className="flex items-center border p-4 rounded-lg shadow-md bg-gray-50">
                <FiPhone className="mr-3 text-gray-400" />
                <input
                  type="text"
                  name="buyer.contact"
                  value={invoiceData.buyer.contact}
                  onChange={handleInputChange}
                  placeholder="Buyer Contact"
                  className="w-full bg-transparent focus:outline-none text-lg"
                />
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
            {invoiceData.products.map((product, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-6">
                <div className="flex items-center border p-2 rounded-lg shadow-md bg-gray-50">
                  <select
                    value={productOptions.find(p => p.description === product.description)?.id || ''}
                    onChange={(e) => handleProductSelect(index, e)}
                    className="w-full bg-transparent focus:outline-none text-sm"
                  >
                    <option value="" disabled>Select Product</option>
                    {productOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.description}</option>
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
                    placeholder="HSN/SAC"
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
                  <AiOutlineDollar className="mr-3 text-gray-400" />
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
                  <FiPercent className="mr-3 text-gray-400" />
                  <input
                    disabled
                    type="number"
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
              Submit Invoice
            </button>
          </div>
        </form>
      </div>
      </div>
    <Footer/>
    </div>
  );
};

export default InvoiceForm;
