import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CountUp from "react-countup";
import useAdmin from "../hooks/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyProfile = ({ userData, setModalOpen }) => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: statData } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
// console.log(statData?.users);
  // Data for the Rechart Pie Chart
  const chartData = [
    { name: "Clients", value: statData?.users },
    { name: "Guides", value: statData?.guides },
    { name: "Packages", value: statData?.packages },
    { name: "Stories", value: statData?.stories },
    { name: "Bookings", value: statData?.bookings },
    { name: "Bookings", value: statData?.applications },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#0088FE"];

  return (
    <div className="my-12 flex flex-col items-center w-full space-y-12">
      {/* Profile Section */}
      <div className="bg-primary w-full items-center flex flex-col p-16 space-y-6">
        <div className="avatar mb-4">
          <div className="w-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img
              src={userData?.photo || "https://via.placeholder.com/150"}
              alt="Admin Profile"
            />
          </div>
        </div>
        <p className="text-3xl text-light font-semibold">
          {userData?.name || "Admin"}
        </p>
        <div className="badge bg-secondary text-primary p-4 font-semibold">
          Role: {userData?.role || "Admin"}
        </div>
      </div>

      {isAdmin && (
        <div className="bg-white w-full p-10 rounded-lg shadow-lg space-y-10">
          {/* Admin Stats Section */}
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            Admin Stats Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">
                Total Revenue
              </p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.revenue}
                prefix="$"
                duration={2.5}
              />
            </div>
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">Tour Guides</p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.guides}
                duration={2}
              />
            </div>
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">Packages</p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.packages}
                duration={2}
              />
            </div>
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">Clients</p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.users}
                duration={2}
              />
            </div>
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">Stories</p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.stories}
                duration={2}
              />
            </div>
            <div className="bg-light shadow-md p-6 rounded-lg text-center">
              <p className="text-lg font-semibold text-gray-600">Applications</p>
              <CountUp
                className="text-3xl font-bold text-primary"
                end={statData?.applications}
                duration={2}
              />
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="flex justify-center mt-8">
            <PieChart width={400} height={300}>
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
          </div>
        </div>
      )}

      {/* Edit Profile Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="btn bg-primary text-light rounded-none w-full mt-4"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
