import React, { useState, useEffect } from 'react';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { Link, Navigate } from 'react-router-dom';

const AdmissionPortal = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [redirectToCreate, setRedirectToCreate] = useState(false); // Track redirection to /create
  const [redirectToApplication, setRedirectToApplication] = useState(false); // Track redirection to /createapplication
  const [emailExists, setEmailExists] = useState(false);
    const { setActiveItem } = useActiveItem();
  

  // Check if user is already logged in by looking for user data in localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      checkEmail(parsedUserData.email); // Check if email exists
    }
  }, []);

  const checkEmail = async (email) => {
    try {
      const response = await fetch('https://cvsu-backend-system.vercel.app/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setEmailExists(data.exists); // Update the email existence state
      if (data.exists) {
        setRedirectToApplication(true); // Redirect if email exists
      } else {
        setRedirectToCreate(true); // Redirect to /create if email does not exist
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleLoginSuccess = (response) => {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    console.log('Decoded JWT:', decodedToken);

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(decodedToken));
    setUserData(decodedToken); // Store the decoded data
    checkEmail(decodedToken.email); // Check if the email exists
    setActiveItem('/createapplication');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  if (redirectToApplication) {
    return <Navigate to="/createapplication" state={{ userData }} />;
  }

  if (redirectToCreate) {
    return <Navigate to="/create" state={{ userData }} />;
  }

  return (
    <GoogleOAuthProvider clientId="224048094361-ojsb9g9mlk53aqham85ati3sdg2oetc8.apps.googleusercontent.com">
      <div>
        <TopNav />
        <div
          className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center pb-[70px] pt-[70px]"
          style={{ backgroundImage: `url(${StudentImage})` }}
        >
          <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
              <h2 className="text-3xl font-extrabold text-[#C61A01]">Admission Portal</h2>
            </div>
            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </div>

            <div className="text-center pt-4">
              <a href="#" className="text-sm text-[#C61A01] hover:underline">
                Read The Admission Overview?
              </a>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AdmissionPortal;
