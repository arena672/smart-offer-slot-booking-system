import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import api from "../services/api";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalOffers: 0,
    activeOffers: 0,
    totalBookings: 0,
    bookedSeats: 0,
    availableSeats: 0,
  });

  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchSummary();
    fetchBookings();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get("/Dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/Bookings");
      setRecentBookings(response.data.slice(-5).reverse());
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-2">
                Manage offers, bookings, and business activity from one place.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/offers"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                + Create Offer
              </Link>

              <Link
                to="/business-profile"
                className="bg-white border px-5 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Business Profile
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
            <StatCard title="Total Offers" value={String(summary.totalOffers)} />
            <StatCard title="Active Offers" value={String(summary.activeOffers)} />
            <StatCard title="Total Bookings" value={String(summary.totalBookings)} />
            <StatCard title="Booked Seats" value={String(summary.bookedSeats)} />
            <StatCard title="Available Seats" value={String(summary.availableSeats)} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Bookings
                </h2>

                <Link
                  to="/bookings"
                  className="text-blue-600 font-medium hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Offer</th>
                      <th className="pb-3">Slot</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b last:border-none">
                        <td className="py-4 font-medium text-gray-800">
                          {booking.customerName}
                        </td>
                        <td className="py-4 text-gray-600">
                          {booking.offerName}
                        </td>
                        <td className="py-4 text-gray-600">
                          {booking.slotTime}
                        </td>
                        <td className="py-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {recentBookings.length === 0 && (
                  <p className="text-gray-500 mt-4">
                    No recent bookings yet.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <Link
                  to="/offers"
                  className="block bg-blue-50 text-blue-700 p-4 rounded-xl hover:bg-blue-100 transition"
                >
                  Create a new offer
                </Link>

                <Link
                  to="/bookings"
                  className="block bg-green-50 text-green-700 p-4 rounded-xl hover:bg-green-100 transition"
                >
                  Manage bookings
                </Link>

                <Link
                  to="/active-offers"
                  className="block bg-purple-50 text-purple-700 p-4 rounded-xl hover:bg-purple-100 transition"
                >
                  View public offers
                </Link>

                <Link
                  to="/business-profile"
                  className="block bg-orange-50 text-orange-700 p-4 rounded-xl hover:bg-orange-100 transition"
                >
                  Update business profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;