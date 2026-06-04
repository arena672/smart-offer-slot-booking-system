import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function OffersListPage() {
  const [offers, setOffers] = useState<any[]>([]);

useEffect(() => {
  fetchOffers();
}, []);

const fetchOffers = async () => {
  try {
    const response = await api.get("/Offers");
    setOffers(response.data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Smart Booking Offers
        </h1>

        <Link
          to="/"
          className="text-blue-600 font-medium hover:underline"
        >
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
        >
            Business Login
          </Link>
        </Link>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Available Offers
        </h1>

        <p className="text-gray-600 mb-8">
          Book limited-time offers from nearby businesses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {offer.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {offer.business}
                  </p>
                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {offer.discount}
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-gray-400 line-through">
                  {offer.originalPrice}
                </span>

                <span className="text-3xl font-bold text-blue-600">
                  {offer.offerPrice}
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {offer.slots}
              </p>

              <Link
                to={`/offer/${offer.id}`}
                className="block text-center mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffersListPage;