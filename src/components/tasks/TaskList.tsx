import { Task } from "@prisma/client";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h2>
              <p className="text-sm text-gray-600">
                {task.description || "بدون توضیحات"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
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
          <div className="mt-2 text-xs text-gray-500">
            <p>ایجاد: {new Date(task.createdAt).toLocaleDateString("fa-IR")}</p>
            <p>
              آخرین تغییر:{" "}
              {new Date(task.updatedAt).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
