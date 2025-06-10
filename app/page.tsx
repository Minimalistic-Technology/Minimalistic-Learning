import Course from "./components/Course";
import Explore from "./components/Explore";
import Footer from "./components/Footer";
import Glance from "./components/Glance";
import Hero from "./components/Hero";
import { InfiniteMovingCardsDemo } from "./components/InfiniteMovingCardsDemo";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import ScrollProgressBar from "./components/ScrollerProgress";
import { getServerSession } from 'next-auth';
import { Redirect } from "./components/Redirect";
import { redirect } from 'next/navigation'; 


export default async function Home() {
  // const session = await getServerSession();
  // if (!session?.user) {
  //   redirect('/login');
  // }
  return (
    <div>  <ScrollProgressBar/>
    <div>
      <Hero />
      {/* <Course/> */}
      <Explore/>
      <Services />
      <WhyUs/>
      {/* <InfiniteMovingCardsDemo/> */}
      <Glance />
      <Footer />
    </div>
    </div>
  );
}
