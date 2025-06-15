"use client";

export default function ErrorState() {
  return (
    <div className="max-w-md bg-white p-8 rounded-xl shadow text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-2">خطا</h1>
      <p className="text-sm text-gray-600">
        خطایی در بارگذاری وظایف رخ داد. لطفاً دوباره تلاش کنید.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
