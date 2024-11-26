import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './contexts/AppContext.jsx';
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx';
import Apply from './pages/Apply.jsx';
import Privacy from './pages/DataPrivacyNotice.jsx';
import Create from './pages/Create.jsx';

import Studentdb from './pages/Studentdb.jsx';
import Profile from './pages/StudentdbPages/Profile.jsx';
import Courses from "./pages/StudentdbPages/Courses.jsx";
import Enroll from "./pages/StudentdbPages/Enroll.jsx";
import Home from "./pages/StudentdbPages/Home.jsx";
import Notifications from "./pages/StudentdbPages/Notifications.jsx";
import Settings from "./pages/StudentdbPages/Settings.jsx";

import CreateApplication from "./pages/CreateApplication.jsx";
import Details from './pages/CreateAppPages/Details.jsx';
import Personal from './pages/CreateAppPages/Personal.jsx';
import Contact from './pages/CreateAppPages/Contact.jsx';
import Family from './pages/CreateAppPages/Family.jsx';
import Education from './pages/CreateAppPages/Education.jsx';
import Requirement from './pages/CreateAppPages/Requirement.jsx';
import Appointment from './pages/CreateAppPages/Appointment.jsx';

import Register from './pages/Register.jsx';
import UniversityHistory from './pages/AboutUsPages/UniversityHistory.jsx';
import ComputerStudies from './pages/AboutUsPages/ComputerStudies.jsx';
import MissionVision from './pages/AboutUsPages/MissionVision.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


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
    path: "/comstudy",
    element: <ComputerStudies />,
    children: [
      {
        index: true, // Default route for /studentdb
        path: "details",
        element: <Details />, // Render the Home component by default
      },
      {
        path: "personal",
        element: <Personal />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "contact",
        element: <Contact />, // Component to render when /studentdb/courses is visited
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
        path: "home",
        element: <Home />, // Render the Home component by default
      },
      {
        path: "profile",
        element: <Profile />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "courses",
        element: <Courses />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "enroll",
        element: <Enroll />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "notifications",
        element: <Notifications />, // Component for /studentdb/notifications
      },
      {
        path: "settings",
        element: <Settings />, // Component for /studentdb/settings
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
