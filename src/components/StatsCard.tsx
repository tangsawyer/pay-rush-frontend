import React from "react";

interface Props {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  loading?: boolean;
}

export function StatsCard({ title, value, icon, color = "blue", loading = false }: Props) {
  // Map color prop to actual color classes
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    gray: "bg-gray-50 text-gray-700"
  };
  
  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  
  return (
    <div className={`p-4 rounded-lg ${loading ? 'bg-gray-50' : colorClass} transition-colors duration-300`}>
      {loading ? (
        <>
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-8 w-16 bg-gray-300 rounded animate-pulse"></div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm opacity-80">{title}</p>
            {icon && <div className="text-opacity-70">{icon}</div>}
          </div>
          <p className="text-2xl sm:text-3xl font-bold">{value}</p>
        </>
      )}
    </div>
  );
}
