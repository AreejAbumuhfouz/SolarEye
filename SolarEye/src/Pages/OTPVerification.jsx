
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
// import axios from 'axios';
// import Cookies from 'js-cookie'; // To manage cookies for storing JWT

// const OTPVerification = ({ onClose }) => {
//   const [otp, setOtp] = useState(''); // State for OTP input
//   const [error, setError] = useState(''); // State for managing error messages
//   const navigate = useNavigate(); // Hook to navigate to the home page

//   // Handle OTP submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       // Send OTP to the backend for validation
//       const response = await axios.post('http://localhost:5000/api/auth/verifyOTP', { otp }, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' }
//       });

//       // If OTP is valid, store the token in cookies
//       if (response.data.token) {
//         Cookies.set('token', response.data.token, { expires: 1, path: '/' }); // Store JWT token in cookies
//         onClose(); // Close the OTP modal
//         navigate('/'); // Redirect to the home page after successful OTP verification
//       } else {
//         setError('Invalid OTP. Please try again.'); // Show error if OTP is invalid
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred. Please try again.'); // Handle any errors from the backend
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>

//         {/* OTP Input */}
//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)} // Update OTP value
//           placeholder="Enter OTP"
//           className="border p-2 rounded mb-4 w-full"
//         />

//         {/* Error message */}
//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit} // Trigger the submit function
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { X } from 'lucide-react'; // Import X icon for close button

// const OTPVerification = ({ onClose, email }) => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
//   const modalRef = useRef(null);
//   const inputRef = useRef(null);
//   const navigate = useNavigate();

//   // Focus on input when modal opens
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   // OTP expiration countdown
//   useEffect(() => {
//     if (timeLeft <= 0) return;
    
//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [timeLeft]);

//   // Format time for display
//   const formatTime = () => {
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   // Handle OTP input change
//   const handleOtpChange = (e) => {
//     const value = e.target.value;
//     // Only allow numbers and limit to 6 digits
//     if (/^\d*$/.test(value) && value.length <= 6) {
//       setOtp(value);
//       setError('');
//     }
//   };

//   // Handle modal close when clicking outside
//   const handleClickOutside = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   // Handle key press for accessibility
//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       onClose();
//     }
//   };

//   // Handle OTP submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate OTP format
//     if (otp.length !== 6) {
//       setError('Please enter a valid 6-digit OTP code');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Send OTP to the backend for validation
//       const response = await axios.post('http://localhost:5000/api/auth/verifyOTP', { otp }, {
//         withCredentials: true,  // Ensure cookies (session cookies) are sent with requests
//         headers: { 'Content-Type': 'application/json' }
//       }
//       );

//       // If OTP is valid, store the token in cookies
//       if (response.data.token) {
//         Cookies.set('token', response.data.token, { 
//           expires: 1, 
//           path: '/',
//           secure: window.location.protocol === 'https:', // Only send over HTTPS
//           sameSite: 'strict' // Protect against CSRF
//         });
//         onClose();
//         navigate('/');
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       if (err.response?.status === 401) {
//         setError('Invalid or expired OTP. Please try again.');
//       } else {
//         setError(err.response?.data?.message || 'An error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle resend OTP
//   const handleResendOTP = async () => {
//     if (timeLeft > 0) return;
    
//     try {
//       await axios.post('http://localhost:5000/api/auth/resendOTP', 
//         { email }, 
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );
//       setTimeLeft(120); // Reset timer
//       setError('');
//     } catch (err) {
//       setError('Failed to resend OTP. Please try again.');
//     }
//   };

//   // Add event listeners for modal interaction
//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleKeyDown);
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <div 
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="otp-modal-title"
//     >
//       <div 
//         ref={modalRef}
//         className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>

//         <h3 
//           id="otp-modal-title"
//           className="text-xl font-semibold mb-4 text-center"
//         >
//           Enter OTP
//         </h3>

//         <p className="text-sm text-gray-600 mb-6 text-center">
//           A verification code has been sent to your email.
//           Please enter it below.
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* OTP Input */}
//           <input
//             ref={inputRef}
//             type="text"
//             value={otp}
//             onChange={handleOtpChange}
//             placeholder="Enter 6-digit OTP"
//             className="border p-3 rounded mb-4 w-full text-center text-lg tracking-widest"
//             aria-label="One-time password"
//             maxLength={6}
//           />

//           {/* Timer display */}
//           <div className="text-center mb-4 text-sm">
//             {timeLeft > 0 ? (
//               <p>Code expires in: {formatTime()}</p>
//             ) : (
//               <p className="text-red-500">Code expired</p>
//             )}
//           </div>

//           {/* Error message */}
//           {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading || otp.length !== 6}
//             className={`bg-gradient-to-r from-[#185B8D] to-[#4ACEF4] text-white px-4 py-3 rounded w-full font-medium ${
//               loading || otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
//             }`}
//           >
//             {loading ? 'Verifying...' : 'Verify OTP'}
//           </button>

//           {/* Resend OTP */}
//           <button
//             type="button"
//             onClick={handleResendOTP}
//             disabled={timeLeft > 0}
//             className={`mt-4 text-sm text-center w-full text-blue-600 hover:text-blue-800 ${
//               timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             Resend verification code
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { X } from 'lucide-react'; // Import X icon for close button

const OTPVerification = ({ onClose, email }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus on input when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log("Focus set to OTP input field");
    }
  }, []);

  // OTP expiration countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      console.log(`Time left: ${timeLeft - 1} seconds`);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time for display
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value;
    console.log('OTP input value:', value);

    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };

  // Handle modal close when clicking outside
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle key press for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting OTP:', otp);
    
    // Validate OTP format
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP code');
      console.error('Invalid OTP length');
      return;
    }

    setLoading(true);

    try {
      // Send OTP to the backend for validation
      console.log('Sending OTP:', otp); // Make sure it's correctly set before sending
      const response = await axios.post('http://localhost:5000/api/auth/verifyOTP', { otp }, {
        withCredentials: true,  // Send cookies along with the request
        headers: { 'Content-Type': 'application/json' }
      });


      

      console.log('Backend response:', response);

      // If OTP is valid, store the token in cookies
      if (response.data.token) {
        Cookies.set('token', response.data.token, { 
          expires: 1, 
          path: '/',
          secure: window.location.protocol === 'https:', // Only send over HTTPS
          sameSite: 'strict' // Protect against CSRF
        });
        console.log('JWT token stored in cookies:', response.data.token);
        onClose();
        navigate('/');
      } else {
        setError('Invalid OTP. Please try again.');
        console.error('Invalid OTP response from backend');
      }
    } catch (err) {
      console.error('Error during OTP verification:', err);
      if (err.response?.status === 401) {
        setError('Invalid or expired OTP. Please try again.');
      } else {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log('Loading state reset');
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    console.log('Resending OTP...');
    try {
      await axios.post('http://localhost:5000/api/auth/resendOTP', 
        { email }, 
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setTimeLeft(120); // Reset timer
      setError('');
      console.log('OTP resent successfully');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Error while resending OTP:', err);
    }
  };

  // Add event listeners for modal interaction
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    console.log('Event listeners added for modal interactions');
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      console.log('Event listeners removed for modal interactions');
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="otp-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h3 
          id="otp-modal-title"
          className="text-xl font-semibold mb-4 text-center"
        >
          Enter OTP
        </h3>

        <p className="text-sm text-gray-600 mb-6 text-center">
          A verification code has been sent to your email.
          Please enter it below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <input
            ref={inputRef}
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            className="border p-3 rounded mb-4 w-full text-center text-lg tracking-widest"
            aria-label="One-time password"
            maxLength={6}
          />

          {/* Timer display */}
          <div className="text-center mb-4 text-sm">
            {timeLeft > 0 ? (
              <p>Code expires in: {formatTime()}</p>
            ) : (
              <p className="text-red-500">Code expired</p>
            )}
          </div>

          {/* Error message */}
          {error && <p className="text-red-600 mb-4 text-center text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className={`bg-gradient-to-r from-[#185B8D] to-[#4ACEF4] text-white px-4 py-3 rounded w-full font-medium ${
              loading || otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* Resend OTP */}
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={timeLeft > 0}
            className={`mt-4 text-sm text-center w-full text-blue-600 hover:text-blue-800 ${
              timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend verification code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
