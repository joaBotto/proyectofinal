//import React from 'react';
import { Link } from 'react-router-dom';

const VisualDashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <Link to="edit_personal_date">Editar informacion Personal</Link>
      </div>
      <div>
        <Link to="edit_security">Editar Seguridad</Link>
      </div>
      <div>
        <Link to="edit_payment">Editar datos de pago</Link>
      </div>
      <div>
        <Link to="/email_notification">Notificaciones por Email</Link>
      </div>
      <div>
        <Link to="/edit_property">Editar Publicaciones</Link>
      </div>
    </div>
  );
};

export default VisualDashboard;
