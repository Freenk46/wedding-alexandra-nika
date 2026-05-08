import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import ProgramSection from "@/components/ProgramSection";
import LocationSection from "@/components/LocationSection";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <main style={{ position: 'relative' }}>
      <Navbar />
      <div style={{ height: '100vh' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', zIndex: 1 }}>
        <HeroSection />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <StorySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 3 }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <GallerySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 4 }}>
        <ProgramSection />
        <LocationSection />
        <RsvpSection />
        <Footer />
      </div>
    </main>
  );
}
