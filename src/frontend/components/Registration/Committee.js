import React, { useState } from 'react';
import RegistarationFormInput from './RegistarationFormInput';
import './RegistrationFormStyle.css';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import extractErrorCode from '../ErrorMessage';

const Committee = ({ web3Handler, account, swms, provider }) => {
  const navigate = useNavigate();

  // Initialize form state as strings, not arrays
  const [member, setMember] = useState({
    fullName: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });

  const inputs = [
    {
      id: 'fullName',
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
      errorMessage: 'Name should only consist of letters.',
      label: 'Full Name',
      pattern: '[A-Za-z]+ [A-Za-z]+\\s{0,1}[A-Za-z]*',
      required: true,
    },
    {
      id: 'contactNumber',
      name: 'contactNumber',
      type: 'number',
      placeholder: 'Contact Number',
      errorMessage: 'Contact number should only have 10 digits.',
      label: 'Contact Number',
      pattern: '[0-9]{10}',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'The password should be 8 to 20 characters and should have at least 1 number, 1 special character, 1 alphabet',
      label: 'Password',
      required: true,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Passwords should match',
      label: 'Confirm Password',
      pattern: member.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (account != null) {
      console.log('Address', account, member.fullName);

      // Ensure the committee member is not already registered
      let isRegistered = false;
      try {
        // Assuming there is a function in the smart contract to check registration
        isRegistered = await swms.isCommitteeMember(account);
      } catch (err) {
        console.error("Error checking registration:", err);
      }

      if (isRegistered) {
        swal("Oops", "Address is already registered. Please use another address.", "error");
        return;
      }

      try {
        let txn = await swms.registerCommittee(
          member.fullName,          // Pass as a string
          member.contactNumber,      // Pass as a string
          member.password            // Pass as a string
        );
        
        // Wait for the transaction to be mined
        provider.waitForTransaction(txn.hash).then(async function (txn) {
          console.log('Transaction Mined: ' + txn.hash);
          let mid = await swms.totalMembers();
          mid = parseInt(mid.toHexString(), 16);

          swal(
            'Hurray!!',
            'You are registered successfully ...\n Kindly remember your id: ' + mid,
            'success'
          );
          navigate('/login');
          
          // Log member details for debugging
          let _mid = await swms.members(mid);
          console.log('Name: ', _mid.name);
          console.log('Member id: ', _mid.memberId);
        });
      } catch (err) {
        console.log("Error during registration:", err);
        extractErrorCode(err);
      }
    } else {
      swal("Oops", "Please connect your Metamask account before registering.", "error");
    }
  };

  // Fix state update to store values as strings, not arrays
  const onChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <div className='divForm'>
      <form className='registrationForm' onSubmit={handleSubmit}>
        <h1 className='formHeader'>Committee Registration</h1>
        {inputs.map((input) => (
          <RegistarationFormInput
            key={input.id}
            {...input}
            onChange={onChange}
          />
        ))}

        <button className='submitButton' type='button' onClick={web3Handler}>
          Connect the account
        </button>
        <button className='submitButton' type='submit'>
          Register as a member
        </button>
      </form>
    </div>
  );
};

export default Committee;
