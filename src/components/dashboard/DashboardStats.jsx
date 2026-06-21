import React from "react";
import { StatCard } from "./StatCard";

export const DashboardStats = ({ statsData = [] }) => {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.id || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
};