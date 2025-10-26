import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import PhoneModel from "@/components/phone-model";
import LaptopModel from "@/components/laptop-model";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Connected Bento Sections */}
      <div className="w-full py-20">
        {/* About Section */}
        <About />

        {/* Features Section */}
        <About 
          variant="body"
          title="Advanced Detection"
          tagline="Machine learning powered surveillance with real-time crime detection"
          linkText="Explore features"
          linkHref="#features"
          id="features"
          reverse={true}
          customModel={<PhoneModel />}
        />

        {/* Technology Section */}
        <About 
          variant="body"
          title="Real-Time Analytics"
          tagline="Instant threat assessment and automated response coordination"
          linkText="View technology"
          linkHref="#technology"
          id="technology"
          reverse={false}
          customModel={<LaptopModel />}
        />
      </div>

      {/* Schedule Section */}
      <section id="schedule" className="w-full bg-zinc-50 dark:bg-black py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
            Schedule
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-center text-zinc-600 dark:text-zinc-400">
              Event schedule coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="w-full bg-white dark:bg-zinc-950 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
            Sponsors
          </h2>
          <p className="text-lg text-center text-zinc-600 dark:text-zinc-400">
            Thank you to our amazing sponsors for making this event possible.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <div id="faq" className="w-full">
        <FAQ />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}