import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="bg-white text-center p-10 rounded-xl shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        هیچ وظیفه‌ای یافت نشد
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        برای شروع، یک وظیفه جدید ایجاد کنید.
      </p>
      <Link
        href="/tasks/new"
        className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        ایجاد وظیفه جدید
      </Link>
    </div>
  );
}
