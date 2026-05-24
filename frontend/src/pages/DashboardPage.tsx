import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalOffers: 0,
    activeOffers: 0,
    totalBookings: 0,
    bookedSeats: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/Dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatCard title="Total Offers" value={String(summary.totalOffers)} />
            <StatCard title="Active Offers" value={String(summary.activeOffers)} />
            <StatCard title="Total Bookings" value={String(summary.totalBookings)} />
            <StatCard title="Booked Seats" value={String(summary.bookedSeats)} />
            <StatCard title="Available Seats" value={String(summary.availableSeats)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;