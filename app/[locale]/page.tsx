import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import JourneySection from "@/components/JourneySection";
import RsvpSection from "@/components/RsvpSection";
import DividerMarquee from "@/components/DividerMarquee";
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

      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#EAE6DD' }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <StorySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 3, backgroundColor: '#111' }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <GallerySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 4, backgroundColor: '#EAE6DD' }}>
        <JourneySection />
      </div>

      <div style={{ position: 'relative', zIndex: 5, backgroundColor: '#EAE6DD' }}>
        <DividerMarquee />
        <RsvpSection />
      </div>

      <div style={{ position: 'relative', zIndex: 6, backgroundColor: '#EAE6DD' }}>
        <Footer />
      </div>
    </main>
  );
}
