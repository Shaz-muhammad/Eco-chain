import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './App.css';
import { ethers } from "ethers";

// Importing components
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Certificate from './Certificate';
import Committee from './Registration/Committee';
import Login from './Login';
import Register from './Registration/Register';
import Customer from './Registration/Customer';
import Welcome from './Welcome';
import Address from './Address';
import CustomerHome from './Login/Customer/CustomerHome';
import AddWaste from './Login/Customer/AddWaste';
import History from './Login/Customer/History';
import CommitteeHome from './Login/Committee/CommitteeHome';
import PendingTasks from './Login/Committee/PendingTasks';
import CompletedTasks from './Login/Committee/CompletedTasks';
import CommitteeAccount from './Login/Committee/CommitteeAccount';
import CustomerAccount from './Login/Customer/CustomerAccount';
import AuthForm from './AuthForm';

// Importing contract data
import SWMSAddress from '../contractsData/SWMS-address.json';
import SWMSAbi from '../contractsData/SWMS.json';

function App() {
  const [account, setAccount] = useState(null);
  const [swms, setSwms] = useState({});
  const [provider, setProvider] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', () => {
      // window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };

  const loadContracts = async (signer) => {
    const swms1 = new ethers.Contract(SWMSAddress.address, SWMSAbi.abi, signer);
    setSwms(swms1);
    swal('Successfully connected', '', 'success');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/certificate' element={<Certificate />} />
        <Route path='/address' element={<Address />} />

        {/* Show AuthForm if not authenticated before Register */}
        <Route
          path='/register'
          element={
            !isAuthenticated ? (
              <AuthForm onAuthenticate={setIsAuthenticated} />
            ) : (
              <Register />
            )
          }
        >
          {/* Nested routes */}
          <Route
            index
            element={
              <Customer
                web3Handler={web3Handler}
                account={account}
                swms={swms}
                provider={provider}
              />
            }
          />
          <Route
            path='customer'
            element={
              <Customer
                web3Handler={web3Handler}
                account={account}
                swms={swms}
                provider={provider}
              />
            }
          />
          <Route
            path='committee'
            element={
              <Committee
                web3Handler={web3Handler}
                account={account}
                swms={swms}
                provider={provider}
              />
            }
          />
        </Route>

        <Route
          path='/login'
          element={
            <Login
              web3Handler={web3Handler}
              account={account}
              swms={swms}
              provider={provider}
            />
          }
        />
        <Route path='/customer-home' element={<CustomerHome
          account={account}
          swms={swms}
          provider={provider}
        />}>
          <Route index element={<AddWaste
            account={account}
            swms={swms}
            provider={provider}
          />} />
          <Route path='add-waste' element={<AddWaste
            account={account}
            swms={swms}
            provider={provider}
          />} />
          <Route path='history' element={<History
            account={account}
            swms={swms}
            provider={provider}
          />} />
          <Route path='account' element={<CustomerAccount
            swms={swms}
          />} />
        </Route>
        <Route path='/committee-home' element={<CommitteeHome
          web3Handler={web3Handler}
          swms={swms}
          provider={provider}
        />}>
          <Route index element={<PendingTasks
            swms={swms}
            provider={provider}
          />} />
          <Route path='pending-tasks' element={<PendingTasks
            swms={swms}
            provider={provider}
          />} />
          <Route path='completed-tasks' element={<CompletedTasks
            swms={swms}
            provider={provider}
          />} />
          <Route path='account' element={<CommitteeAccount
            swms={swms}
          />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
