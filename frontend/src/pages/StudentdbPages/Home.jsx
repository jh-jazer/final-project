import { FaBook, FaClipboardCheck, FaBell } from "react-icons/fa";

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
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaClipboardCheck />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Enroll</h2>
            <p className="text-sm text-gray-500">Start or continue enrollment.</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaBook />
          </div>
          <div>
            <h2 className="text-xl font-semibold">My Courses</h2>
            <p className="text-sm text-gray-500">
              View and manage your registered courses.
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-600 text-3xl">
            <FaBell />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-sm text-gray-500">
              Stay updated with important alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700">Announcements</h2>
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <p className="text-lg font-medium">No new announcements at this time.</p>
          <p className="text-sm text-gray-500 mt-2">
            Check back later for updates on schedules, events, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
