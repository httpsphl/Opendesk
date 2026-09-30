"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { label: string; abertos: number; fechados: number };

export function MetricsChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#e3e5f2" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7086", fontSize: 12 }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#6b7086", fontSize: 12 }} />
          <Tooltip cursor={{ fill: "#eef0fb" }} contentStyle={{ borderRadius: 12, border: "1px solid #e3e5f2", fontSize: 12 }} />
          <Bar dataKey="abertos" name="Abertos" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="fechados" name="Fechados" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
