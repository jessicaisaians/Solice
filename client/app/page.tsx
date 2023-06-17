import Collections from "./components/HomeContent/sections/Collections/Collections";
import HeroImage from "./components/HomeContent/sections/Hero/index";

export default function Home() {
  return (
    <>
      <HeroImage />
      <Collections />
      <section className="h-[100vh] w-full ">
        <p className="text-white"> helloo this is Jessica isk what im doing</p>
      </section>
    </>
  );
}
