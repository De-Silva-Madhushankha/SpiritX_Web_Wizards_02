import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import UserDashBoard from './pages/UserPages/DashBoard';
import AdminDashBoard from './pages/AdminPages/DashBoard';
import TeamPage from './pages/UserPages/Team';
import Leaderboard from './pages/LeaderBoard';
import BudgetManagement from './pages/UserPages/Budget';
import SearchPlayers from './pages/UserPages/Players';

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
        <Route path="/user/team" element={<TeamPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user/budget-management" element={<BudgetManagement />} />
        <Route path="/user/search-players" element={<SearchPlayers />} />

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
