import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function OfferDetailPage() {
  const { id } = useParams();
  const [offer, setOffer] = useState<any>(null);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const response = await api.get(`/Offers/${id}`);
      setOffer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading offer details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Smart Booking Offers
        </h1>

        <Link
          to="/active-offers"
          className="text-blue-600 font-medium hover:underline"
        >
          Back to Offers
        </Link>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-3xl shadow p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-blue-600 font-semibold mb-2">
                {offer.businessName}
              </p>

              <h1 className="text-4xl font-bold text-gray-800">
                {offer.title}
              </h1>

              <p className="text-gray-500 mt-3">
                Category: {offer.category}
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-gray-400 line-through text-xl">
                ₹{offer.originalPrice}
              </p>

              <p className="text-4xl font-bold text-blue-600">
                ₹{offer.offerPrice}
              </p>

              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mt-3">
                Limited Time Offer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-100 rounded-2xl p-5">
              <p className="text-gray-500">Available Seats</p>
              <p className="text-2xl font-bold">{offer.availableSeats}</p>
              <p className="text-gray-500 text-sm mt-1">
                {offer.bookedSeats} seats already booked
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5">
              <p className="text-gray-500">Status</p>
              <p className="text-2xl font-bold">{offer.status}</p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-5">
              <p className="text-gray-500">Location</p>
              <p className="text-2xl font-bold">Delhi</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Offer Details
            </h2>

            <p className="text-gray-600 leading-relaxed">
              This offer allows customers to reserve a discounted slot for the selected business service.
              Booking is subject to slot availability and capacity limits.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Terms and Conditions
            </h2>

            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Booking is valid only for the selected slot.</li>
              <li>Offer cannot be combined with another offer.</li>
              <li>Business may cancel or pause the offer if required.</li>
              <li>Customers must provide valid contact details.</li>
            </ul>
          </div>

          <Link
            to={`/booking/${offer.id}`}
            className="block text-center mt-10 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition text-lg font-medium"
          >
            Book Slot
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OfferDetailPage;