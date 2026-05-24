import { Link } from "react-router-dom";

function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="text-4xl font-bold text-green-600">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mt-4">
          Your slot has been reserved successfully.
        </p>

        <div className="bg-gray-100 rounded-2xl p-6 mt-8 text-left space-y-3">
          <p>
            <span className="font-semibold">
              Booking ID:
            </span>{" "}
            BK1024
          </p>

          <p>
            <span className="font-semibold">
              Offer:
            </span>{" "}
            Gym Trial Slot
          </p>

          <p>
            <span className="font-semibold">
              Slot:
            </span>{" "}
            10 AM - 11 AM
          </p>

          <p>
            <span className="font-semibold">
              Status:
            </span>{" "}
            Confirmed
          </p>
        </div>

        <Link
          to="/active-offers"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Back to Offers
        </Link>
      </div>
    </div>
  );
}

export default BookingSuccessPage;