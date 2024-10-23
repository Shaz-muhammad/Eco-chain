import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Certificate from './Certificate';
import Welcome from './Welcome';




function App() {
  const [account, setAccount] = useState(null);
  const [swms, setSwms] = useState({});
  const [provider, setProvider] = useState();

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
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
