// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useGlobalState } from '../component/User/GlobalState';
import { useState } from 'react';

const Header = () => {
    const { state, dispatch } = useGlobalState();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-md fixed w-full z-10">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Ganpati Computers</h1>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>
                </div>
                <nav className="hidden lg:flex space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                    <Link to="/invoice/new" className="text-gray-600 hover:text-blue-600">New Invoice</Link>
                    <Link to="/add-stock" className="text-gray-600 hover:text-blue-600">Add Stock</Link>
                    <Link onClick={handleLogout} className="text-gray-600 hover:text-blue-600">Logout</Link>
                </nav>
            </div>

            {/* Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 z-20`}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <nav className="mt-16 space-y-4 pl-8">
                    <Link to="/" className="block text-gray-600 hover:text-blue-600">Dashboard</Link>
                    <Link to="/invoice/new" className="block text-gray-600 hover:text-blue-600">New Invoice</Link>
                    <Link to="/add-stock" className="block text-gray-600 hover:text-blue-600">Add Stock</Link>
                    <Link onClick={handleLogout} className="block text-gray-600 hover:text-blue-600">Logout</Link>
                </nav>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={toggleMenu}
                ></div>
            )}
        </header>
    );
};

export default Header;
