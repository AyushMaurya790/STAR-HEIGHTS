import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p className="mt-2 text-gray-600">
        Welcome to Star Heights Admin Panel
      </p>
    </div>
  );
}