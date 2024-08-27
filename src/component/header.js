// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">BillingApp Dashboard</h1>
                <nav>
                    <Link to="/" className="text-gray-600 hover:text-blue-600 px-4">Dashboard</Link>
                    <Link to="/" className="text-gray-600 hover:text-blue-600 px-4">Invoices</Link>
                    <Link to="/" className="text-gray-600 hover:text-blue-600 px-4">Settings</Link>
                    <Link to="/sign-in" className="text-gray-600 hover:text-blue-600 px-4">Sign In</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
