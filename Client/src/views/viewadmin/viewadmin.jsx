import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";

const cardStyle =
  "bg-white shadow-md p-4 rounded-lg text-center transform hover:scale-105 transition-all duration-300 cursor-pointer group h-34"; // Aplicamos altura fija
const cardContentStyle = "w-96"; // Aplicamos ancho fijo
const descriptionStyle = "mt-2";

const backButtonStyle =
  "bg-violet shadow-md text-white py-2 px-4 rounded-full absolute top-4 left-4 hover:bg-pink";

const mainDivStyle = {
  height: "100vh", // Establece la altura al 100% de la ventana
  margin: 0, // Elimina márgenes
  padding: 0, // Elimina relleno
  backgroundImage: `url(${fondo})`, // Agrega la imagen de fondo
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column", // Cambia la dirección de los elementos a columna
  alignItems: "center", // Centra el contenido verticalmente
  justifyContent: "center", // Centra el contenido horizontalmente
};

const VisualDashboard = () => {
  return (
    <div style={mainDivStyle} className="bg-cover">
      <Link to="/">
        <button className={backButtonStyle}>Back to home</button>
      </Link>
      <h2 className="text-4xl font-semibold text-blue mt-8">
        Admin Settings.
      </h2>
      <p className="text-blue">Manage your experience Admin.</p>
      <div className="flex justify-center my-20">
        <Link to="/admin/properties" className={`mx-4 ${cardStyle}`}>
          <div className={cardContentStyle}>
            <div className="block text-xl font-semibold text-blue group-hover:text-teal-400">
              Posts
            </div>
            <p
              className={`text-blue group-hover:text-teal-400 ${descriptionStyle}`}
            >
              All Posts.
            </p>
          </div>
        </Link>
        <Link to="/admin/users" className={`mx-4 ${cardStyle}`}>
          <div className={cardContentStyle}>
            <div className="block text-xl font-semibold text-blue group-hover:text-teal-400">
              Users
            </div>
            <p
              className={`text-blue group-hover:text-teal-400 ${descriptionStyle}`}
            >
              All Users.
            </p>
          </div>
        </Link>
        <Link to="/paymentEdit" className={`mx-4 ${cardStyle}`}>
          <div className={cardContentStyle}>
            <div className="block text-xl font-semibold text-blue group-hover:text-teal-400">
              Bookings
            </div>
            <p
              className={`text-blue group-hover:text-teal-400 ${descriptionStyle}`}
            >
              All Bookings.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VisualDashboard;
