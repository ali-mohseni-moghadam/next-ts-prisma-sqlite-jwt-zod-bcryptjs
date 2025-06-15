import { Task } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 401) {
        redirect("/login");
      }
      throw new Error(`خطای ${res.status}: ${await res.text()}`);
    }

    const tasks: Task[] = await res.json();

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">وظایف</h1>
            <div className="space-x-4">
              <Link
                href="/tasks/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                افزودن وظیفه جدید
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  خروج
                </button>
              </form>
            </div>
          </div>

          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  role="listitem"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {task.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">
                        {task.description || "بدون توضیحات"}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : task.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status === "COMPLETED"
                        ? "تکمیل‌شده"
                        : task.status === "IN_PROGRESS"
                        ? "در حال انجام"
                        : "شروع‌نشده"}
                    </span>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>
                      ایجاد‌شده در:{" "}
                      {new Date(task.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                    <p>
                      به‌روزرسانی‌شده در:{" "}
                      {new Date(task.updatedAt).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="text-center py-12 bg-white rounded-lg shadow-md"
              role="alert"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                هیچ وظیفه‌ای یافت نشد
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                برای شروع، یک وظیفه جدید ایجاد کنید.
              </p>
              <div className="mt-4">
                <Link
                  href="/tasks/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  ایجاد وظیفه جدید
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("خطا در دریافت وظایف:", error);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">خطا</h1>
          <p className="mt-2 text-sm text-gray-600">
            خطایی در بارگذاری وظایف رخ داد. لطفاً دوباره تلاش کنید.
          </p>
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }
}
