import { Link } from 'react-router-dom';

const VisualDashboard = () => {
  return (
    <div>
      <h2>Gestion de cuenta</h2>
      <div>
        <Link to="/personalEdit">Personal Edit</Link>
      </div>
      <div>
        <Link to="/paymentEdit">Edit Payment</Link>
      </div>
    </div>
  );
};

export default VisualDashboard;