import { FaUser, FaClipboardList, FaBook } from "react-icons/fa";

const StudentDashboardHome = () => {
  const user = {
    name: "John Doe",
  };

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <p className="mt-2 text-lg">
          Here is your dashboard. Navigate through the options to manage your
          courses, enrollment, and more.
        </p>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Panel */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaUser />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-sm text-gray-500">View and edit your profile.</p>
          </div>
        </div>

        {/* Checklist Panel */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaClipboardList />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Checklist</h2>
            <p className="text-sm text-gray-500">Track your graduation progress.</p>
          </div>
        </div>

        {/* Enroll Panel */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaBook />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Enroll</h2>
            <p className="text-sm text-gray-500">Start or continue your enrollment.</p>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700">Schedule</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <p className="text-lg font-medium">No upcoming classes at this time.</p>
          <p className="text-sm text-gray-500 mt-2">
            Check back later for updates on your class schedule and events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
