import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

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

    const tasks: Task[] = await res.json();
    console.log(res);

    return (
      <div>
        <h1>وظایف</h1>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                {task.title} - {task.status}
              </li>
            ))
          ) : (
            <li>هیچ وظیفه‌ای یافت نشد</li>
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("خطا در دریافت وظایف:", error);
    return (
      <div>
        <h1>خطا</h1>
        <p>خطایی در بارگذاری وظایف رخ داد. لطفاً دوباره تلاش کنید.</p>
      </div>
    );
  }
}
