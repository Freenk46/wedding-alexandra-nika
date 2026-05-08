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
        <DividerMarquee />
      </div>

      <div style={{ position: 'relative', zIndex: 4 }}>
        <JourneySection />

        {/* Divider top */}
        <div style={{ padding: '0 32px', background: '#EAE6DD' }}>
          <div style={{ height: '1px', background: '#111' }} />
        </div>

        <RsvpSection />

        {/* Divider bottom */}
        <div style={{ padding: '0 32px', background: '#EAE6DD' }}>
          <div style={{ height: '1px', background: '#111' }} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
