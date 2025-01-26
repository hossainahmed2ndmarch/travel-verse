import Banner from "../Banner";
import Overview from "./Overview";
import Stories from "./Stories";
import TourismGuide from "./TourismGuide";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Overview></Overview>
      <TourismGuide></TourismGuide>
      <Stories></Stories>
    </div>
  );
};

export default Home;
