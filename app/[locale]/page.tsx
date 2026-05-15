import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import EditorialSection from "@/components/EditorialSection";
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

      <div style={{ position: 'relative', zIndex: 2, backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <StorySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 3, backgroundColor: 'var(--bg-secondary)', transition: 'background-color 0.3s' }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <GallerySection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 4, backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
        <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -12px 60px rgba(0,0,0,0.2)' }}>
          <EditorialSection />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 5, backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
        <DividerMarquee />
        <RsvpSection />
      </div>

      <div style={{ position: 'relative', zIndex: 6, backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
        <Footer />
      </div>
    </main>
  );
}
