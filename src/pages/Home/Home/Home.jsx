import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Overview from "./Overview";
import Stories from "./Stories";
import TourismGuide from "./TourismGuide";
import TourismSections from "./TourismSections";

const Home = () => {
  return (
    <div className="px-6 mx-auto">
      <Helmet>
        <title>Home | TravelVerse</title>
      </Helmet>
      <Banner></Banner>
      <div className="">
        <Overview></Overview>
        <TourismGuide></TourismGuide>
        <Stories></Stories>
        <TourismSections></TourismSections>
      </div>
    </div>
  );
};

export default Home;
