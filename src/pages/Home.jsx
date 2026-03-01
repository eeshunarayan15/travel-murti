import RelatedBlogs from "@/components/Blog/RelatedBlogs";
import FrequentlyAskedQuestion from "@/components/FrequentlyAskedQuestion/FrequentlyAskedQuestion";
import DealOfTheDay from "@/components/home/DealOfTheDay";
import HeroSection from "@/components/home/HeroSection";
import LatestTourPackages from "@/components/home/LatestTourPackages";
import SpiritualSubPackages from "@/components/home/SpiritualSubPackages";
import Testimonials from "@/components/home/Testimonials";
import UnescoWorldHeritageSites from "@/components/home/UnescoWorldHeritageSites";
import TripPlannerModal from "@/components/TripPlannerModal/TripPlannerModal";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <TripPlannerModal />
      <HeroSection />
      <DealOfTheDay />
      <SpiritualSubPackages />
      <LatestTourPackages />
      <UnescoWorldHeritageSites />
      <Testimonials />
      {/* <RelatedBlogs/> */}
      <WhyChooseUs /> 
      <FrequentlyAskedQuestion />
    </div>
  );
}

export default Home