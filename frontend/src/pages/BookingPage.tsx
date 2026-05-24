import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BookingPage() {
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [slotTime, setSlotTime] = useState("");
    const [peopleCount, setPeopleCount] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await api.post("/Bookings", {
      customerName,
      customerPhone,
      offerName: "Gym Trial Slot",
      slotTime,
      peopleCount,
    });

    navigate("/booking-success");
  } catch (error) {
    console.error(error);
  }
};

    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Book Offer Slot
        </h1>

        <p className="text-gray-600 mb-8">
          Fill your details to reserve this limited-time offer.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">
              Customer Name
            </label>
            <input
  type="text"
  placeholder="Enter your name"
  className="w-full border rounded-xl p-3"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Phone Number
            </label>
            <input
  type="text"
  placeholder="Enter phone number"
  className="w-full border rounded-xl p-3"
  value={customerPhone}
  onChange={(e) => setCustomerPhone(e.target.value)}
/>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Select Slot
            </label>
            <select
  className="w-full border rounded-xl p-3"
  value={slotTime}
  onChange={(e) => setSlotTime(e.target.value)}
>
  <option value="">Select Slot</option>
  <option>10 AM - 11 AM</option>
  <option>3 PM - 4 PM</option>
  <option>5 PM - 6 PM</option>
</select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Number of People
            </label>
            <input
  type="number"
  className="w-full border rounded-xl p-3"
  value={peopleCount}
  onChange={(e) => setPeopleCount(Number(e.target.value))}
/>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;