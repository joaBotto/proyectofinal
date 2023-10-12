import { Link } from 'react-router-dom';

const VisualDashboard = () => {
  return (
    <div>
      <h2>Gestion de cuenta</h2>
      <div>
        <Link to="/dashboard/edit_personal_date">Personal Edit</Link>
      </div>
      <div>
        <Link to="/dashboard/edit_payment">Edit Payment</Link>
      </div>
    </div>
  );
};

export default VisualDashboard;