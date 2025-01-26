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
    <div className="my-10 p-6">
      <h2 className="text-4xl text-center font-bold">
        Wanderlust Chronicles: Your Ultimate Tourism and Travel Guide
      </h2>
      <p className="text-center">
        Embark on an unforgettable journey with our comprehensive tourism and{" "}
        <br />
        travel guide. From exotic destinations to hidden gems, we bring <br />{" "}
        you curated travel experiences, insider tips, and must-visit <br />
        attractions worldwide.
      </p>
      <div className="mt-10">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Our Packages</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>
          <TabPanel>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages?.map((item) => (
                <PackageCard key={item?._id} item={item}></PackageCard>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
