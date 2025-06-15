import { getTasks } from "../../lib/getTasks";
import TaskList from "../../components/tasks/TaskList";
import EmptyState from "../../components/tasks/EmptyState";
import ErrorState from "../../components/tasks/ErrorState";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TasksPage() {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/auth/login");

  try {
    const tasks = await getTasks(token);

    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <section className="max-w-4xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">وظایف</h1>
            <div className="flex gap-3">
              <Link
                href="/tasks/new"
                className="rounded-lg bg-blue-600 text-white text-sm px-4 py-2 hover:bg-blue-700 transition"
              >
                افزودن وظیفه جدید
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 text-white text-sm px-4 py-2 hover:bg-red-700 transition"
                >
                  خروج
                </button>
              </form>
            </div>
          </header>

          {tasks.length > 0 ? <TaskList tasks={tasks} /> : <EmptyState />}
        </section>
      </main>
    );
  } catch (e: any) {
    if (e.status === 401) redirect("/auth/login");
    console.error("خطا در دریافت وظایف:", e);
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorState />
      </main>
    );
  }
}
