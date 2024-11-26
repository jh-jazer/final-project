import React, { useState } from 'react';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link, Navigate } from 'react-router-dom';

const AdmissionPortal = () => {
  const [redirect, setRedirect] = useState(false);
  const handleLoginSuccess = (response) => {
    // console.log('Login Success:', response.credential);
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    console.log('Decoded JWT:', decodedToken);
    // get credentials from google and send to db
    // !!!
    setRedirect(true);
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  if (redirect) {
    return <Navigate to="/create" />;
}

  return (
    <GoogleOAuthProvider clientId="224048094361-ojsb9g9mlk53aqham85ati3sdg2oetc8.apps.googleusercontent.com">
      <div>
        <TopNav />
        <div
          className="flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${StudentImage})` }}
        >
          <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
            <div className="flex flex-col items-center">
              <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
              <h2 className="text-3xl font-extrabold text-[#C61A01]">Admission Portal</h2>
            </div>
            <div className="mt-6 text-center">
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
