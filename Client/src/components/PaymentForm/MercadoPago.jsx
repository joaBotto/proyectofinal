import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
require('dotenv').config();


const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-50de6ec5-6fc0-4549-ad6e-04f3d04befed');

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:3001/create_preference", {
        description: "Mi Alquiler",
        price: 200,
        quantity: 1,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center'>
      <h1 className='text-2xl font-semibold mb-4'>Mercado Pago</h1>
        
          <p className='price'>100 $</p>
          <button 
          onClick={handleBuy}>Buy</button>
        
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
    
  );
};

export default Product;
