import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend,
  ResponsiveContainer as LineResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: statData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const chartData = [
    { name: "Clients", value: statData?.users },
    { name: "Guides", value: statData?.guides },
    { name: "Packages", value: statData?.packages },
    { name: "Stories", value: statData?.stories },
    { name: "Bookings", value: statData?.bookings },
    { name: "Applications", value: statData?.applications },
  ];

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#0088FE",
    "#FF6347",
  ];

  // Revenue Trend Data for Line Chart
  const revenueTrendData = statData?.revenueTrend.map((entry) => ({
    name: `${entry._id.month}-${entry._id.year}`,
    totalRevenue: entry.totalRevenue,
  }));

  return (
    <div className="min-h-screen mt-12 py-10 px-4 md:px-16 w-full">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        Admin Stats Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: "Total Revenue", value: statData?.revenue, prefix: "$" },
          { label: "Tour Guides", value: statData?.guides },
          { label: "Packages", value: statData?.packages },
          { label: "Clients", value: statData?.users },
          { label: "Stories", value: statData?.stories },
          { label: "Applications", value: statData?.applications },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-secondaryBg p-4 md:p-6 rounded-lg text-center"
          >
            <p className="text-base md:text-lg font-semibold text-secondaryText">
              {item.label}
            </p>
            <CountUp
              className="text-xl md:text-3xl font-bold text-primaryText"
              end={item.value}
              prefix={item.prefix || ""}
              duration={2}
              separator=","
            />
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mt-10 bg-secondaryBg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-primaryText text-center mb-4">
          Stats Breakdown
        </h3>
        <div className="flex relative justify-center items-center w-full">
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart (Revenue Trend) */}
      <div className="mt-10 bg-secondaryBg rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-primaryText text-center mb-4">
          Revenue Trend Over Time
        </h3>
        <div className="flex justify-center items-center w-full">
          <LineResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#4ade80"
                activeDot={{ r: 8 }}
              />
              <LineTooltip />
              <Legend />
            </LineChart>
          </LineResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
