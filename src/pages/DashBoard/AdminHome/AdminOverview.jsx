import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: statData } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const chartData = [
    { name: "Clients", value: statData?.users },
    { name: "Guides", value: statData?.guides },
    { name: "Packages", value: statData?.packages },
    { name: "Stories", value: statData?.stories },
    { name: "Bookings", value: statData?.bookings },
    { name: "Applications", value: statData?.applications },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#0088FE"];

  return (
    <div className="bg-white w-full mt-12 p-6 rounded-lg shadow-lg space-y-8 md:space-y-10">
      <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-6">
        Admin Stats Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: statData?.revenue, prefix: "$" },
          { label: "Tour Guides", value: statData?.guides },
          { label: "Packages", value: statData?.packages },
          { label: "Clients", value: statData?.users },
          { label: "Stories", value: statData?.stories },
          { label: "Applications", value: statData?.applications },
        ].map((item, index) => (
          <div key={index} className="bg-light shadow-md p-4 md:p-6 rounded-lg text-center">
            <p className="text-base md:text-lg font-semibold text-gray-600">{item.label}</p>
            <CountUp
              className="text-xl md:text-3xl font-bold text-primary"
              end={item.value}
              prefix={item.prefix || ""}
              duration={2}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center w-full">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;
