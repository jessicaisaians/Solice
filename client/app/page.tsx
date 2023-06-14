import Collections from "./components/HomeContent/sections/Collections/collections";
import HeroImage from "./components/HomeContent/sections/Hero/index";

export default function Home() {
  return (
    <>
      <HeroImage />
      <Collections />
      <section className="h-[200vh] w-full bg-blue-50"></section>
    </>
  );
}
