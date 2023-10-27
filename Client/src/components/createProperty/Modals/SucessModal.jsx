import React from 'react'
import {Link} from 'react-router-dom'
import Success from "../../../assets/img/check.png"
import Logo from "../../../assets/img/logo.png"

export default function Successful ({setShowSuccessModal}) {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute bg-black opacity-50 inset-0"></div>
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center"> ¡ Successful registration YOU PROPERTY !</h2>
          <p className="text-gray-700 text-lg mb-4 text-center">Find Your Property On The Home or at Registered Properties </p>
          <img src={Logo} alt="logo" className="w-32 h-16 mx-auto block mb-6" />
          <div className="flex justify-center items-center space-y-4">
          <img src={Success} alt="Success" className="w-16 h-16 " />
            <Link to = "/login">
            <button onClick={() => {setShowSuccessModal(false)}} className="bg-fuchsia-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              OK
            </button>
            </Link>
          </div>
        </div>
      </div>
      
    )
}