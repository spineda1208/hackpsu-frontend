import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* About Sections - Brutalist Style */}
      <div className="w-full py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 md:px-0">
          <About 
            title="Intelligent Crime Monitoring"
            bodyText="Transform your CCTV infrastructure into an AI-powered security system."
            id="about"
            index={1}
          />

          <About 
            title="AI-Powered Detection"
            bodyText="ML computer vision identifies criminal activity. Google Gemini analyzes footage and generates detailed incident reports."
            id="detection"
            index={2}
          />

          <About 
            title="Instant Alert System"
            bodyText="Automated real-time notifications ensure law enforcement receives critical information immediately."
            id="alerts"
            index={3}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="w-full">
        <FAQ />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}