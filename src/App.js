import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from "./Screens/Welcome.js";
import Login from './Screens/UserScreen/Login.js'
import Dashboard from './Screens/InnerPage/Dashboard.js'
import Invoicenew from './Screens/InnerPage/invoicenew.js'
import TotalInvoice from './Screens/InnerPage/TotalInvoice.js'
import UnpaidInvoice from './Screens/InnerPage/UnpaidInvoice.js'
import StockDetails from './Screens/InnerPage/StockDetails.js'
import PaidInvoices from './Screens/InnerPage/PaidInvoices.js'
import Addstock from './Screens/InnerPage/Addstock.js'
import InvoicePrint from './component/InvoicePrint.js'
import { useGlobalState } from './component/User/GlobalState.js'

const App = () => {
  const { state, dispatch } = useGlobalState();
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<WelcomePage />} /> */}
          {/* <Route exact path="/Dashboard" element={<Dashboard />} /> */}
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/invoices" element={<InvoicePrint />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/invoice/new" element={<Invoicenew />} />
          <Route exact path="/totalInvoice" element={<TotalInvoice />} />
          <Route exact path="/paidInvoices" element={<PaidInvoices />} />
          <Route exact path="/unpaidInvoice" element={<UnpaidInvoice />} />
          <Route exact path="/stockDetails" element={<StockDetails />} />
          <Route exact path="/add-stock" element={<Addstock />} />

          {/* {state.isAuthenticated ? (
            <>
              <Route exact path="/Dashboard" element={<Dashboard />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )} */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
