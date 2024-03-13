// SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import  {Link,useNavigate}  from 'react-router-dom';
import { url } from '../../utils/url';
const BASE_URL = url;

const api = axios.create({
  baseURL: BASE_URL,
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('user/signin/', { username, password });
      const token = response.data.token;
      const first_name=response.data.first_name;
      const is_superuser=response.data.is_superuser;
      const is_staff=response.data.is_staff;

      

      // Store the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('is_superuser', is_superuser);
      localStorage.setItem('is_staff', is_staff);
      // Redirect the user to another page
      navigate('/');
      
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <>
    <div className="compare-pie-container" style={{ display: 'flex', flexDirection: 'column' ,color: 'grey'}}>
      <div>
        <form onSubmit={handleSignIn}>
            <label>Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit" style={{ border: '2px solid grey', color: 'grey', backgroundColor: 'white' }}>
              Sign In
              </button>
        </form>
        </div>
        <div>
        <p>
        Don't have an account? <Link to="/signup" style={{ color: 'blue' }}>Sign Up</Link>
        </p>
        </div>
        </div>
    </>
  );
};

export default SignIn;
