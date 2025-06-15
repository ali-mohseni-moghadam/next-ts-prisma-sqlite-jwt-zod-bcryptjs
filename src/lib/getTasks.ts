import { Task } from "@prisma/client";

export async function getTasks(token: string): Promise<Task[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    headers: { Cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    const error = new Error(text);
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
}
