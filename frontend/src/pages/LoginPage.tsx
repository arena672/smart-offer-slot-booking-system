import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Smart Booking
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Admin Login Panel
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;