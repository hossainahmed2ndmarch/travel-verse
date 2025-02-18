import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import CountUp from "react-countup";
import useAuth from "../../../hooks/useAuth";

const TouristOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  
  const { data: statData, isLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-statistics/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading || !statData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const { totalTrips, totalSpent, totalStories, bookingStatusCounts, spendingTrends } = statData;

  // Process Booking Status Data for Pie Chart
  const bookingData = Object.keys(bookingStatusCounts || {}).map((key) => ({
    name: key,
    value: bookingStatusCounts[key],
  }));

  const COLORS = ["#4ade80", "#facc15", "#f87171", "#60a5fa"]; // Green, Yellow, Red, Blue

  return (
    <div className="bg-white w-full mt-12 p-6 rounded-lg shadow-lg space-y-8 md:space-y-10">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-primary text-center mb-6">
        Your Travel Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { label: "Total Trips", value: totalTrips },
          { label: "Total Spent ($)", value: totalSpent },
          { label: "Total Stories", value: totalStories },
        ].map((item, index) => (
          <div key={index} className="bg-light shadow-md p-4 md:p-6 rounded-lg text-center">
            <h3 className="text-base md:text-lg font-semibold text-gray-600">{item.label}</h3>
            <CountUp start={0} end={item.value || 0} duration={2} separator="," className="text-xl md:text-3xl font-bold text-primary" />
          </div>
        ))}
      </div>

      {/* Booking Status Chart */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Booking Status
        </h3>
        <div className="flex justify-center items-center w-full">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie data={bookingData} cx="50%" cy="50%" label outerRadius={100} fill="#8884d8" dataKey="value">
                {bookingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Trends Graph */}
      <div className="mt-10 bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
          Monthly Spending Trend
        </h3>
        <div className="flex justify-center items-center w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#4ade80" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TouristOverview;
