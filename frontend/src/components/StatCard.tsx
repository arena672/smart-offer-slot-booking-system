type StatCardProps = {
  title: string;
  value: string;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-700">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-4 text-blue-600">
        {value}
      </p>
    </div>
  );
}

export default StatCard;