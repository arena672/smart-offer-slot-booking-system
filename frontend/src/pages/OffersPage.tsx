import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function OffersPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Create Offer
          </h1>

          <form className="bg-white p-8 rounded-2xl shadow space-y-6 max-w-3xl">
            <div>
              <label className="block text-lg font-medium mb-2">
                Offer Title
              </label>

              <input
                type="text"
                placeholder="Enter offer title"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Original Price
              </label>

              <input
                type="number"
                placeholder="₹499"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Offer Price
              </label>

              <input
                type="number"
                placeholder="₹99"
                className="w-full border rounded-xl p-3"
              />
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