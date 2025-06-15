import NewTasks from "@/components/tasks/NewTasks";

export default function NewTaskPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">ایجاد وظیفه جدید</h1>
        {/* Add form for creating tasks */}
        <NewTasks />
      </div>
    </div>
  );
}
