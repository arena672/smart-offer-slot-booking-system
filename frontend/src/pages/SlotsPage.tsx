import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function SlotsPage() {
  const [slots, setSlots] = useState<any[]>([]);

  const [slotData, setSlotData] = useState({
    offerId: 1,
    slotDate: "",
    startTime: "",
    endTime: "",
    capacity: 10,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await api.get("/Slots");
      setSlots(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    setSlotData({
      ...slotData,
      [e.target.name]: e.target.value,
    });
  };

  const createSlot = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/Slots", slotData);

      setSlotData({
        offerId: 1,
        slotDate: "",
        startTime: "",
        endTime: "",
        capacity: 10,
      });

      setShowForm(false);

      fetchSlots();
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Manage Slots
              </h1>

              <p className="text-gray-500 mt-2">
                Monitor slot availability and booking activity.
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              + Create Slot
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={createSlot}
              className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-6 gap-4"
            >
              <input
                type="number"
                name="offerId"
                value={slotData.offerId}
                onChange={handleChange}
                className="border rounded-xl p-3"
                min="1"
                placeholder="Offer ID"
                required
              />
              
              <input
                type="date"
                name="slotDate"
                value={slotData.slotDate}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
              />

              <input
                type="time"
                name="startTime"
                value={slotData.startTime}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
              />

              <input
                type="time"
                name="endTime"
                value={slotData.endTime}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
              />

              <input
                type="number"
                name="capacity"
                value={slotData.capacity}
                onChange={handleChange}
                className="border rounded-xl p-3"
                min="1"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Save Slot
              </button>
            </form>
          )}

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Start Time</th>
                  <th className="p-4 text-left">End Time</th>
                  <th className="p-4 text-left">Capacity</th>
                  <th className="p-4 text-left">Booked</th>
                  <th className="p-4 text-left">Available</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {slots.map((slot) => {
                  const availableSeats =
                    slot.capacity - slot.bookedCount;

                  return (
                    <tr key={slot.id} className="border-b">
                      <td className="p-4">{slot.slotDate}</td>

                      <td className="p-4">
                        {slot.startTime}
                      </td>

                      <td className="p-4">
                        {slot.endTime}
                      </td>

                      <td className="p-4">
                        {slot.capacity}
                      </td>

                      <td className="p-4">
                        {slot.bookedCount}
                      </td>

                      <td className="p-4 font-semibold text-blue-600">
                        {availableSeats}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            slot.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {slot.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {slots.length === 0 && (
              <p className="p-6 text-gray-500">
                No slots available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotsPage;