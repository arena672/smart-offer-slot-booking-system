import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function DashboardPage() {
  return (
  <div className="flex bg-gray-100">
    <Sidebar />

    <div className="flex-1">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <StatCard title="Total Offers" value="12" />
          <StatCard title="Bookings" value="45" />
          <StatCard title="Active Offers" value="8" />
        </div>
      </div>
    </div>
  </div>
);
}

export default DashboardPage;