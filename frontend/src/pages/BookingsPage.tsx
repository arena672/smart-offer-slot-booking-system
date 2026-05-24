import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/Bookings");
      setBookings(response.data);
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
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Manage Bookings
          </h1>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Offer</th>
                  <th className="p-4 text-left">Slot</th>
                  <th className="p-4 text-left">People</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="p-4">{booking.customerName}</td>
                    <td className="p-4">{booking.customerPhone}</td>
                    <td className="p-4">{booking.offerName}</td>
                    <td className="p-4">{booking.slotTime}</td>
                    <td className="p-4">{booking.peopleCount}</td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <p className="text-gray-500 mt-6">
              No bookings found yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingsPage;