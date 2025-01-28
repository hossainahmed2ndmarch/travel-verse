import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Overview from "./Overview";
import Stories from "./Stories";
import TourismGuide from "./TourismGuide";
import TourismSections from "./TourismSections";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | TravelVerse</title>
      </Helmet>
      <Banner></Banner>
      <Overview></Overview>
      <TourismGuide></TourismGuide>
      <Stories></Stories>
      <TourismSections></TourismSections>
    </div>
  );
};

export default Home;
