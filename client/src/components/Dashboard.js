import { Link } from "react-router-dom";
//const EmployeeList = lazy(() => import('./EmployeeList'));
import EmployeeList from "./EmployeeList";

const Dashboard = () => {
  return (
    <div>
       <EmployeeList />
      <div className="fixed-action-btn">
        <Link
          to="/employeecreate"
          className="btn-floating btn-large green lighten-2"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
