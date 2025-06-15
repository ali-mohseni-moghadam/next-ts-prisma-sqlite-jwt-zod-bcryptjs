export const fetcher = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "خطا در دریافت اطلاعات");
  }

  return res.json();
};
