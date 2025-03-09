import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UserDashBoard from './pages/UserPages/DashBoard';
import AdminDashBoard from './pages/AdminPages/DashBoard';
import Spiriter from './pages/Spiriter/Spiriter';
import TeamPage from './pages/UserPages/Team';
import Leaderboard from './pages/LeaderBoard';
import BudgetManagement from './pages/UserPages/Budget';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/user/dashboard" element={<UserDashBoard />} />
        <Route path="/spiriter" element={<Spiriter />} />
        <Route path="/user/team" element={<TeamPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user/budget-management" element={<BudgetManagement />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        </Route>
        
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}
