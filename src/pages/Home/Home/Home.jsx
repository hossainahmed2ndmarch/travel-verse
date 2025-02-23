import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Overview from "./Overview";
import Stories from "./Stories";
import TourismGuide from "./TourismGuide";
import TourismSections from "./TourismSections";
import EventFestival from "./EventFestival";
import Offer from "./Offer";
import TravelInsurance from "./TravelInsurance";

const Home = () => {
  return (
    <div className="px-6 mx-auto bg-primaryBg">
      <Helmet>
        <title>Home | TravelVerse</title>
      </Helmet>
      <Banner></Banner>
      <div className="py-6">
        <Overview></Overview>
        <TourismGuide></TourismGuide>
        <Stories></Stories>
        <TourismSections></TourismSections>
        <EventFestival></EventFestival>
        <Offer></Offer>
        <TravelInsurance></TravelInsurance>
      </div>
    </div>
  );
};

export default Home;
