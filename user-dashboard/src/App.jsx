import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyTasks from "./pages/MyTasks";
import Notifications from "./pages/Notifications";
import History from "./pages/History";
import ImpactScore from "./pages/ImpactScore";
import Badges from "./pages/Badges";
import Opportunities from "./pages/Opportunities";
import EventDetails from "./pages/EventDetails";
import NGOLayout from "./layouts/NGOLayout";

import NGOLogin from "./pages/ngo/Login";
import NGOSignup from "./pages/ngo/Signup";
import Overview from "./pages/ngo/Overview";
import Campaigns from "./pages/ngo/Campaigns";
import Volunteers from "./pages/ngo/Volunteers";
import NGONotifications from "./pages/ngo/Notifications";
import Organization from "./pages/ngo/Organization";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/ngo/login" element={<NGOLogin />} />
        <Route path="/ngo/signup" element={<NGOSignup />} />
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<MyTasks />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="history" element={<History />} />
          <Route path="impact-score" element={<ImpactScore />} />
          <Route path="badges" element={<Badges />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="opportunities/:id" element={<EventDetails />} />
        </Route>
        <Route path="/ngo" element={<NGOLayout />}>
          <Route index element={<Overview />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="notifications" element={<NGONotifications />} />
          <Route path="organization" element={<Organization />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
