import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';
import profile from './images/user.jpg';
import email from './images/email.jpg';
import password from './images/password.png';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import extractErrorCode from './ErrorMessage';

const Login = ({ web3Handler, account, swms, provider }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const loginUser = async () => {
    localStorage.clear();
    console.log('In login');
    if (account != null) {
      let isCustomer, isMember, txn, id;
      id = parseInt(user.id, 10);

      try {
        console.log(id, user.password);
        isCustomer = await swms.customerAddress(account);
        console.log(isCustomer);
        if (isCustomer) {
          try {
            txn = await swms.loginCustomer(id, user.password);
            swal('Hurray', 'Logged in Successfully', 'success');
            localStorage.setItem('id', id);
            if (rememberMe) {
              localStorage.setItem('rememberMe', 'true');
            }
            navigate('/customer-home/add-waste');
          } catch (err) {
            extractErrorCode(err);
          }
        } else {
          isMember = await swms.memberAddress(account);
          if (isMember) {
            txn = await swms.loginMember(id, user.password);
            provider.waitForTransaction(txn.hash).then(async function (txn) {
              swal('Hurray', 'Logged in Successfully', 'success');
              localStorage.setItem('id', id);
              if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
              }
              navigate('/committee-home/pending-tasks');
            });
          } else {
            swal('Oops!', 'You are not registered. Please register to log in.', 'error');
          }
        }
      } catch (err) {
        const errMsg = extractErrorCode(err);
        swal('Oops!', errMsg, 'error');
      }
    } else {
      swal('Oops', 'Please connect your Metamask account before logging in.', 'error');
    }
  };

  return (
    <div className='container'>
      <div className='sign-up'>
        <h1 className='heading'><b>LOGIN</b></h1>
        
        <div className='text'>
          <img height='20px' src={email} alt="email icon" />
          <input
            placeholder=' example: 243'
            name='id'
            onChange={onChange}
            type='number'
          />
        </div>
        <div className='text'>
          <img height='30px' src={password} alt="password icon" />
          <input
            placeholder=' Password'
            type='password'
            name='password'
            onChange={onChange}
          />
        </div>

        <div className='options'>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember me
          </label>
          <Link to='/forgot-password' className='forgot-password'>
            Forgot password?
          </Link>
        </div>

        <button className='button_login' onClick={web3Handler}>
          Connect Wallet
        </button>

        <button className='button_login' onClick={loginUser}>
          LOGIN
        </button>
        
        {/* <p className='conditions'>
          Don't have an account? <Link to='/register/customer'>Register</Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
