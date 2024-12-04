import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './contexts/AppContext.jsx';
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Apply from './pages/Apply.jsx';
import Privacy from './pages/DataPrivacyNotice.jsx';
import Create from './pages/Create.jsx';


import Admissiondb from './pages/Admissiondb.jsx';
import Studentdb from './pages/Studentdb.jsx';
import Profile from './pages/StudentdbPages/Profile.jsx';
import Checklist from "./pages/StudentdbPages/Checklist.jsx";
import Enroll from "./pages/StudentdbPages/Enroll.jsx";
import Home from "./pages/StudentdbPages/Home.jsx";
import Settings from "./pages/StudentdbPages/Settings.jsx";

import Employeedb from './pages/Employeedb.jsx';
import EmployProfile from './pages/EmployeedbPages/EmployProfile.jsx';
import UserManage from "./pages/EmployeedbPages/UserManage.jsx";
import ApplyManage from "./pages/EmployeedbPages/EmployManage.jsx";
import EmployAcads from "./pages/EmployeedbPages/EmployAcads.jsx";
import EmployStuds from "./pages/EmployeedbPages/EmployStuds.jsx";
import EmployHome from "./pages/EmployeedbPages/EmployHome.jsx";
import EmploySettings from "./pages/EmployeedbPages/EmploySettings.jsx";

import CreateApplication from "./pages/CreateApplication.jsx";
import Details from './pages/CreateAppPages/Details.jsx';
import Personal from './pages/CreateAppPages/Personal.jsx';
import Family from './pages/CreateAppPages/Family.jsx';
import Education from './pages/CreateAppPages/Education.jsx';
import Requirement from './pages/CreateAppPages/Requirement.jsx';
import Appointment from './pages/CreateAppPages/Appointment.jsx';

import Register from './pages/Register.jsx';
import UniversityHistory from './pages/AboutUsPages/UniversityHistory.jsx';
import ComputerStudies from './pages/AboutUsPages/ComputerStudies.jsx';
import MissionVision from './pages/AboutUsPages/MissionVision.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Careers from './pages/Quicklinkspages/Careers.jsx';
import NewsUpdates from './components/News.jsx';
import Forms from './pages/Quicklinkspages/Forms.jsx';

import ApplyProcedures from './pages/Quicklinkspages/ApplyProcedures.jsx';
import FreshmenPro from './pages/ProceduresPages/FreshmenPro.jsx';
import GraduatePro from './pages/ProceduresPages/GraduatePro.jsx';
import ReturneePro from './pages/ProceduresPages/ReturneePro.jsx';
import TransfereePro from './pages/ProceduresPages/TransfereePro.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/apply",
    element: <Apply />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "university",
    element: <UniversityHistory />,
  },
  {
    path: "missionvision",
    element: <MissionVision />,
  },
  {
    path: "procedures",
    element: <ApplyProcedures />,
  },
  {
    path: "freshmen",
    element: <FreshmenPro />,
  },
  {
    path: "transferee",
    element: <TransfereePro />,
  },
  {
    path: "graduatee",
    element: <GraduatePro />,
  },
  {
    path: "returnee",
    element: <ReturneePro />,
  },
  
  {
    path: "careers",
    element: <Careers />,
  },
  {
    path: "forms",
    element: <Forms />,
  },
  {
    path: "newsupdates",
    element: <NewsUpdates />,
  },

  {
    path: "/comstudy",
    element: <ComputerStudies />,
  },
  {
    path: "/admissiondb",
    element: <Admissiondb />,
  },
  {
        path: "/createapplication",
        element: <CreateApplication />,
        children: [
      {
        index: true, // Default route for /studentdb
        element: <Details />, // Render the Home component by default
      },
      {
        path: "personal",
        element: <Personal />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "family",
        element: <Family />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "education",
        element: <Education />, // Component for /studentdb/notifications
      },
      {
        path: "requirements",
        element: <Requirement />, // Component for /studentdb/settings
      },
      {
        path: "appointment",
        element: <Appointment />, // Component for /studentdb/settings
      },
    ],
  },
  {
    path: "/studentdb",
    element: <Studentdb />,
    children: [
      {
        index: true, // Default route for /studentdb
        element: <Home />, // Render the Home component by default
      },
      {
        path: "profile",
        element: <Profile />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "checklist",
        element: <Checklist />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "enroll",
        element: <Enroll />, // Component to render when /studentdb/courses is visited
      },
    
      {
        path: "settings",
        element: <Settings />, // Component for /studentdb/settings
      },
    ],
  },
  {
    path: "/employeedb",
    element: <Employeedb />,
    children: [
      {
        index: true, // Default route for /studentdb
        element: <EmployHome />, // Render the Home component by default
      },
      {
        path: "employProfile",
        element: <EmployProfile />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "employStuds",
        element: <EmployStuds />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "employAcads",
        element: <EmployAcads />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "userManage",
        element: <UserManage />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "applyManage",
        element: <ApplyManage />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "employSettings",
        element: <EmploySettings />, // Component for /studentdb/settings
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);