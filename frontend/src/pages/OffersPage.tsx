import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function OffersPage() {
  const [offer, setOffer] = useState({
    title: "",
    businessName: "",
    originalPrice: 0,
    offerPrice: 0,
    category: "",
    capacity: 20,
    status: "Active",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setOffer({
      ...offer,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      await api.post("/Offers", offer);

      setSuccessMessage("Offer created successfully!");

      setOffer({
        title: "",
        businessName: "",
        originalPrice: 0,
        offerPrice: 0,
        category: "",
        capacity: 20,
        status: "Active",
      });
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
            Create Offer
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow space-y-6 max-w-3xl"
          >
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-xl">
                {successMessage}
              </div>
            )}

            <div>
              <label className="block text-lg font-medium mb-2">
                Offer Title
              </label>
              <input
                name="title"
                type="text"
                value={offer.title}
                onChange={handleChange}
                placeholder="Gym Trial Slot"
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Business Name
              </label>
              <input
                name="businessName"
                type="text"
                value={offer.businessName}
                onChange={handleChange}
                placeholder="PowerFit Gym"
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Category
              </label>
              <input
                name="category"
                type="text"
                value={offer.category}
                onChange={handleChange}
                placeholder="Gym / Salon / Clinic"
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Original Price
              </label>
              <input
                name="originalPrice"
                type="number"
                value={offer.originalPrice}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Offer Price
              </label>
              <input
                name="offerPrice"
                type="number"
                value={offer.offerPrice}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Capacity
              </label>
              <input
                name="capacity"
                type="number"
                value={offer.capacity}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Status
              </label>
              <select
                name="status"
                value={offer.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              >
                <option>Draft</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Expired</option>
                <option>Cancelled</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Create Offer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OffersPage;