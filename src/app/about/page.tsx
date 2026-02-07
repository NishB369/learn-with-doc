import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import AboutHero from "@/src/components/about/AboutHero";
import MissionVision from "@/src/components/about/MissionVision";
import FounderSection from "@/src/components/about/FounderSection";
import AboutStats from "@/src/components/about/AboutStats";
import JourneySection from "@/src/components/about/JourneySection";
import CoreValues from "@/src/components/about/CoreValues";
import TeamSection from "@/src/components/about/TeamSection";
import AboutCTA from "@/src/components/about/AboutCTA";
import aboutData from "@/src/data/aboutData.json";

// Data for MissionVision since it's not explicitly in aboutData.json
const missionData = {
    title: "Our Mission",
    content: "To democratize medical education by providing accessible, high-quality, and clinically relevant training to healthcare professionals worldwide. We believe that better education leads to better patient outcomes, and we are committed to bridging the gap between academic theory and real-world practice.",
    stats: [
        { label: "Medical Specialties", value: "30+" },
        { label: "Partner Hospitals", value: "150+" },
        { label: "CME Credits Awarded", value: "1M+" }
    ]
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <AboutHero title={aboutData.hero.title} subtitle={aboutData.hero.subtitle} />
            <MissionVision data={missionData} />
            <FounderSection data={aboutData.founder} />
            <AboutStats data={aboutData.stats} />
            <JourneySection data={aboutData.journey} />
            <CoreValues data={aboutData.values} />
            <TeamSection data={aboutData.team} />
            <AboutCTA data={aboutData.cta} />
            <Footer />
        </main>
    );
}