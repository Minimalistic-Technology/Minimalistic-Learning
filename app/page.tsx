import Course from "./components/Course";
import Footer from "./components/Footer";
import Glance from "./components/Glance";
import Hero from "./components/Hero";
import { InfiniteMovingCardsDemo } from "./components/InfiniteMovingCardsDemo";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    
    <div>
      <Hero />
      <Course/>
      <Services />
      <WhyUs/>
      {/* <InfiniteMovingCardsDemo/> */}
      <Glance />
      <Footer />
    </div>
  );
}
