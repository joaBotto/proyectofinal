import { Link } from 'react-router-dom';

const cardStyle = 'bg-white shadow-md p-4 rounded-lg text-center';
const descriptionStyle = 'mt-2';

const backButtonStyle = 'bg-violet shadow-md text-white py-2 px-4 rounded-full absolute top-4 left-4';

const mainDivStyle = {
  height: '100vh', // Establece la altura al 100% de la ventana
  margin: 0, // Elimina márgenes
  padding: 0, // Elimina relleno
};

const VisualDashboard = () => {
  return (
    <div style={mainDivStyle}>
      <Link to="/" className={backButtonStyle}>
        Regresar al inicio
      </Link>
      <div className="text-center">
        <div>
          <h2 className="text-2xl font-semibold pt-20">Configuración de cuenta</h2>
          <p className="m-2">Gestiona tu experiencia en Inmuebles360.com</p>
        </div>
        <div className="flex justify-center my-20">
          <div className={`mx-4 ${cardStyle}`}>
            <Link to="/personalEdit" className="block text-xl font-semibold">
              Personal Edit
            </Link>
            <p className={descriptionStyle}>Una breve descripción de lo que hace Personal Edit.</p>
          </div>
          <div className={`mx-4 ${cardStyle}`}>
            <Link to="/paymentEdit" className="block text-xl font-semibold">
              Edit Payment
            </Link>
            <p className={descriptionStyle}>Una breve descripción de lo que hace Edit Payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualDashboard;
