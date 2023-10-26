import React from 'react';
import error from '../../../assets/img/error.png';
import {Link} from 'react-router-dom'


const Error = ({ setShowErrorModal}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute bg-black opacity-50 inset-0"></div>
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Error!</h2>
      <p className="text-gray-700 text-lg mb-4 text-center">
        User with credentials already exists
      </p>
      <div className="flex justify-center items-center space-y-4">
        <img src={error} alt="error" className="w-16 h-16" />
        <Link to = "/login">
        <button 
          onClick={() => { setShowErrorModal(false) }}
          className="bg-fuchsia-900 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          OK
        </button>
        </Link>
      </div>
    </div>
  </div>
);
};

export default Error;