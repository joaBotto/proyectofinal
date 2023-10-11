import React from 'react'
import error from '../../../public/error.png'


export default function ModalError (message) {
    console.log("soy el msj", message)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute bg-black opacity-50 inset-0"></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-72 h-48">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Error!</h2>
          <p className="text-gray-700">The following error has occurred {message}, please try again!</p>
          <div className="mt-2 mb-2 flex justify-center">
              <img src={error} alt="error" className="w-16 h-16" />
          </div>
        </div>
      </div>
      
    )
}