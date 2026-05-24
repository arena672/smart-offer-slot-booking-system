import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        Admin Panel
      </h1>

      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Logout
      </Link>
    </nav>
  );
}

export default Navbar;