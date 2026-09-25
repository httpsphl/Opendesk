"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { label: string; abertos: number; fechados: number };

export function MetricsChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#e7ebe8" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#718078", fontSize: 12 }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#718078", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "#f1f4f2" }} contentStyle={{ borderRadius: 12, border: "1px solid #e1e7e3", fontSize: 12 }} />
          <Bar dataKey="abertos" name="Abertos" fill="#167a6b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="fechados" name="Fechados" fill="#b8c9c1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
