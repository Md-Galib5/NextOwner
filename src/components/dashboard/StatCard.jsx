import React from "react";
import { Card } from "@heroui/react";
import { TrendingUp } from "lucide-react";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend = "+12%",
  className = "",
}) => {
  return (
    <Card
      className={`group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/70 transition group-hover:bg-blue-200" />

      <Card.Content className="relative z-10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">{title}</p>

            <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              {value}
            </h3>

            <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
              <TrendingUp className="h-3.5 w-3.5" />
              {trend} this month
            </div>
          </div>

          {Icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 transition group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};