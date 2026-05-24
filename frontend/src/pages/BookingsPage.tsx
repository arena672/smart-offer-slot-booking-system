import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/Bookings/${id}/status`, JSON.stringify(status), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.customerPhone
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.offerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar  />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Manage Bookings
          </h1>

          <div className="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="Search by customer, phone, or offer..."
              className="border rounded-xl p-3 w-full md:w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="border rounded-xl p-3 w-full md:w-1/3"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
              <option>Completed</option>
              <option>No Show</option>
            </select>
          </div>

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
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="p-4">{booking.customerName}</td>
                    <td className="p-4">{booking.customerPhone}</td>
                    <td className="p-4">{booking.offerName}</td>
                    <td className="p-4">{booking.slotTime}</td>
                    <td className="p-4">{booking.peopleCount}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          updateStatus(booking.id, e.target.value)
                        }
                        className="border rounded-lg p-2"
                      >
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                        <option>Completed</option>
                        <option>No Show</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <p className="text-gray-500 mt-6">
              No bookings found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingsPage;