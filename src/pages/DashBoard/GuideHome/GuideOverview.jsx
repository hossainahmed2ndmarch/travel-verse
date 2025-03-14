import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import useAuth from "../../../hooks/useAuth";

const GuideOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: statData, isLoading } = useQuery({
    queryKey: ["guide-statistics"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide-stats/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading || !statData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  // Fallback data if loading or no data
  const { totalAssignedTours, totalStories, totalReviews, averageRating } =
    statData;

  const chartData = [
    { name: "Assigned Tours", value: totalAssignedTours },
    { name: "Stories", value: totalStories },
    { name: "Reviews", value: totalReviews },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen mt-12 py-10 px-4 md:px-16 w-full">
      <h2 className="text-4xl font-bold text-center text-primaryText mb-8">
        Guide Stats Overview
      </h2>

      {/* Guide Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: "Assigned Tours", value: totalAssignedTours },
          { label: "Stories", value: totalStories },
          { label: "Total Reviews", value: totalReviews },
          { label: "Average Rating", value: averageRating.toFixed(1) },
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
              duration={2}
              decimals={item.label === "Average Rating" ? 1 : 0} // For rating, show one decimal place
            />
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="mt-10 bg-secondaryBg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-primaryText text-center mb-4">
          Booking Status
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
    </div>
  );
};

export default GuideOverview;
