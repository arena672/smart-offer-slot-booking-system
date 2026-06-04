import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="group w-20 hover:w-64 min-h-screen bg-blue-600 text-white p-5 transition-all duration-300 overflow-hidden">
      <h1 className="text-3xl font-bold mb-10 whitespace-nowrap">
        <span className="block group-hover:hidden">SB</span>
        <span className="hidden group-hover:block">Smart Booking</span>
      </h1>

      <ul className="space-y-6 text-lg">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">🏠</span>
            <span className="hidden group-hover:inline whitespace-nowrap">
              Dashboard
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/offers"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">➕</span>
            <span className="hidden group-hover:inline whitespace-nowrap">
              Offers
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/active-offers"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">🏷️</span>
            <span className="hidden group-hover:inline whitespace-nowrap">
              Active Offers
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/bookings"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">📋</span>
            <span className="hidden group-hover:inline whitespace-nowrap">
              Bookings
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/business-profile"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">🏢</span>
            <span className="hidden group-hover:inline whitespace-nowrap">
              Business
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/slots"
            className="flex items-center gap-4 hover:text-blue-200"
          >
            <span className="text-2xl">🕒</span>

            <span className="hidden group-hover:inline whitespace-nowrap">
              Slots
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;