// import Index from "./components/HomeContent/sections/Collections";
import Collections from "./components/HomeContent/sections/Collections/collections";
import Footer from "./components/HomeContent/sections/Footer";
import HeroImage from "./components/HomeContent/sections/Hero/index";
import Services from "./components/HomeContent/sections/Services";
import StickyScroll from "./components/HomeContent/sections/StickyScroll/index";

export default function Home() {
  return (
    <>
      <HeroImage />
      <Collections />
      {/* <Index /> */}
      <StickyScroll />
      <Services />
      <Footer />
    </>
  );
}
