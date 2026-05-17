import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
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

      {/* Invitation (formerly Story) */}
      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#eae6dd', transition: 'background-color 0.3s' }}>
        <div style={{
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
          boxShadow: '0 -12px 60px rgba(0,0,0,0.2)',
        }}>
          <StorySection />
        </div>
      </div>

      {/* Where & When — dark sections */}
      <div style={{ position: 'relative', zIndex: 3, backgroundColor: '#141414', transition: 'background-color 0.3s' }}>
        <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -12px 60px rgba(0,0,0,0.3)' }}>
          <EditorialSection />
        </div>
      </div>

      {/* RSVP */}
      <div style={{ position: 'relative', zIndex: 4, backgroundColor: '#111111', transition: 'background-color 0.3s' }}>
        <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -12px 60px rgba(0,0,0,0.3)' }}>
          <DividerMarquee />
          <RsvpSection />
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 5, backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.3s' }}>
        <Footer />
      </div>
    </main>
  );
}
