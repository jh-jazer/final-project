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
import { UserDataProvider } from './contexts/UserDataContext.jsx';
import { ActiveItemProvider } from './contexts/CreateAppContext.jsx';

import Admissiondb from './pages/Admissiondb.jsx';
import Studentdb from './pages/Studentdb.jsx';
import Profile from './pages/StudentdbPages/Profile.jsx';
import Checklist from "./pages/StudentdbPages/Checklist.jsx";
import Enroll from "./pages/StudentdbPages/Enroll.jsx";
import SocietyPayment from "./pages/StudentdbPages/SocietyPayment.jsx";
import Home from "./pages/StudentdbPages/Home.jsx";
import Settings from "./pages/StudentdbPages/Settings.jsx";

import Employeedb from './pages/Employeedb.jsx';
import EmployProfile from './pages/EmployeedbPages/EmployProfile.jsx';
import EmployEnroll from './pages/EmployeedbPages/EmployEnroll.jsx';
import ApplyManage from "./pages/EmployeedbPages/EmployManage.jsx";
import EmployAcads from "./pages/EmployeedbPages/EmployAcads.jsx";
import EmployStuds from "./pages/EmployeedbPages/EmployStuds.jsx";
import EmployHome from "./pages/EmployeedbPages/EmployHome.jsx";
import EmployInstructors from "./pages/EmployeedbPages/EmployInstructors.jsx";
import ManageAppointment from "./pages/EmployeedbPages/ManageAppointment.jsx";
import ManageSections from "./pages/EmployeedbPages/ManageSections.jsx";
import EmployeeAccounts from "./pages/EmployeedbPages/EmployeeAccounts.jsx";
import StudentAccounts from "./pages/EmployeedbPages/StudentAccounts.jsx";
import AdviserManageApplication from "./pages/EmployeedbPages/AdviserManageApplication.jsx";
import AdviserManageEnrollment from "./pages/EmployeedbPages/AdviserManageEnrollment.jsx";
import SocietyManageApplication from "./pages/EmployeedbPages/SocietyManageApplication.jsx";
import SocietyManageEnrollment from "./pages/EmployeedbPages/SocietyManageEnrollment.jsx";
import AdminAcademicRecords from "./pages/EmployeedbPages/AdminAcademicRecords.jsx";




import CreateApplication from "./pages/CreateApplication.jsx";
import Details from './pages/CreateAppPages/Details.jsx';
import Personal from './pages/CreateAppPages/Personal.jsx';
import Family from './pages/CreateAppPages/Family.jsx';
import Education from './pages/CreateAppPages/Education.jsx';
import Requirement from './pages/CreateAppPages/Requirement.jsx';
import Appointment from './pages/CreateAppPages/Appointment.jsx';


import DocumentVerification from './pages/ContinueAppPages/DocumentVerification.jsx';
import EntranceExamination from './pages/ContinueAppPages/EntranceExamination.jsx';
import DocumentSubmission from './pages/ContinueAppPages/DocumentSubmission.jsx';
import EnrollmentCompleted from './pages/ContinueAppPages/EnrollmentCompleted.jsx';
import ApplicantSocietyPayment from './pages/ContinueAppPages/ApplicantSocietyPayment.jsx';


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
      {
        path: "document-verification", // Default route for /studentdb
        element: <DocumentVerification />, // Render the Home component by default
      },
      {
        path: "entrance-examination",
        element: <EntranceExamination />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "document-submission",
        element: <DocumentSubmission />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "applicant-society-payment",
        element: <ApplicantSocietyPayment />, // Component for /studentdb/notifications
      },
      {
        path: "enrollment-completed",
        element: <EnrollmentCompleted />, // Component for /studentdb/settings
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
        path: "employee-profile",
        element: <EmployProfile />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "student-informations",
        element: <EmployStuds />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "manage-enrollment",
        element: <EmployEnroll />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "academic-records",
        element: <EmployAcads />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "manage-applications",
        element: <ApplyManage />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "employee-instructors",
        element: <EmployInstructors />, // Component for /studentdb/instructors
      },
      {
        path: "manage-appointments",
        element: <ManageAppointment/>, // Component to render when /studentdb/courses is visited
      },
      {
        path: "manage-sections",
        element: <ManageSections />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "payment-records",
        element: <SocietyPayment />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "employee-accounts",
        element: <EmployeeAccounts />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "student-accounts",
        element: <StudentAccounts />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "adviser-applications",
        element: <AdviserManageApplication />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "adviser-enrollments",
        element: <AdviserManageEnrollment />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "society-applications",
        element: <SocietyManageApplication />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "society-enrollments",
        element: <SocietyManageEnrollment />, // Component to render when /studentdb/courses is visited
      },
      {
        path: "admin-academics",
        element: <AdminAcademicRecords />, // Component to render when /studentdb/courses is visited
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <UserDataProvider> {/* Wrap your app with UserDetailsProvider */}
      <ActiveItemProvider> {/* Wrap with ActiveItemProvider */}
        <RouterProvider router={router} />
      </ActiveItemProvider>
      </UserDataProvider>
    </AppProvider>
    
  </StrictMode>
);