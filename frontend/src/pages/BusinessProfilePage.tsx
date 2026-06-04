import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function BusinessProfilePage() {
  const [business, setBusiness] = useState({
    id: 1,
    businessName: "",
    businessType: "",
    ownerName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    openingTime: "",
    closingTime: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const response = await api.get("/Business");
      setBusiness(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      await api.put(`/Business/${business.id}`, business);
      setSuccessMessage("Business profile updated successfully.");
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Business Profile
            </h1>
            <p className="text-gray-500 mt-2">
              Manage business details shown with public offers.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-8 max-w-5xl space-y-6"
          >
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-xl">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  Business Name
                </label>
                <input
                  name="businessName"
                  value={business.businessName}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={business.businessType}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Restaurant</option>
                  <option>Gym</option>
                  <option>Salon</option>
                  <option>Clinic</option>
                  <option>Coaching</option>
                  <option>Turf</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Owner Name
                </label>
                <input
                  name="ownerName"
                  value={business.ownerName}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={business.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={business.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={business.city}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  name="openingTime"
                  value={business.openingTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  name="closingTime"
                  value={business.closingTime}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Address
              </label>
              <input
                name="address"
                value={business.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Save Business Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessProfilePage;