import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PackageCard from "../../../components/packageCard";
import GuidesCard from "../../../components/GuidesCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TourismGuide = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/packages-home").then((res) => {
      setPackages(res?.data);
    });
  }, []);
  useEffect(() => {
    axiosPublic.get("/guides-home").then((res) => {
      setGuides(res?.data);
    });
  }, []);
  return (
    <div className="my-10 space-y-10">
      <div className="space-y-6">
        <h2 className="text-4xl text-center text-primaryText font-bold">
          Wanderlust Chronicles: Your Ultimate Tourism and Travel Guide
        </h2>
        <p className="text-center text-secondaryText">
          Embark on an unforgettable journey with our comprehensive tourism and{" "}
          <br />
          travel guide. From exotic destinations to hidden gems, we bring <br />{" "}
          you curated travel experiences, insider tips, and must-visit <br />
          attractions worldwide.
        </p>
      </div>
      <div className="mt-10">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="flex justify-center space-x-4 ">
            <Tab
              className="px-6 py-2 text-lg font-semibold cursor-pointer text-secondaryText"
              selectedClassName="border-b-4 border-green-500 text-green-500"
            >
              Our Packages
            </Tab>
            <Tab
              className="px-6 py-2 text-lg font-semibold cursor-pointer  text-secondaryText"
              selectedClassName="border-b-4 border-green-500 text-green-500"
            >
              Meet Our Tour Guides
            </Tab>
          </TabList>
          <TabPanel>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
              {packages?.map((item) => (
                <PackageCard key={item?._id} item={item}></PackageCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
              {guides?.map((item) => (
                <GuidesCard key={item?._id} item={item}></GuidesCard>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismGuide;
