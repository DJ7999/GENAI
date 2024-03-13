// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { url } from '../../utils/url';
const BASE_URL = url;

const api = axios.create({
  baseURL: BASE_URL,
});

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to your backend to create a new user
      const response = await api.post('user/signup/', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      });

     

      // After successful signup, you might want to redirect the user to the signin page
      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div className="compare-pie-container"style={{ display: 'flex', flexDirection: 'column', color: 'grey' }}>
      <form onSubmit={handleSignUp}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit" style={{ border: '2px solid grey', color: 'grey', backgroundColor: 'white' }}>
      Sign Up
    </button>
      </form>

      <p>
        Already have an account? <Link to="/signin" style={{ color:'blue' }}>Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
