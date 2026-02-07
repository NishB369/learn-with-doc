import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Marquee from "@/src/components/Marquee";
import Stats from "@/src/components/Stats";
import FeaturedCourses from "@/src/components/FeaturedCourses";
import Instructor from "@/src/components/Instructor";
import HowItWorks from "@/src/components/HowItWorks";
import Testimonials from "@/src/components/Testimonials";
import Footer from "@/src/components/Footer";
import landingPageData from "@/src/data/landingPageData.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero data={landingPageData.hero} />
      <Marquee data={landingPageData.marquee} />
      <Stats data={landingPageData.stats} />
      <FeaturedCourses data={landingPageData.featuredCourses} />
      <Instructor data={landingPageData.instructor} />
      <HowItWorks data={landingPageData.howItWorks} />
      <Testimonials data={landingPageData.testimonials} />
      <Footer />
    </main>
  );
}
