import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="w-full bg-white dark:bg-zinc-950 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
            About HackPSU
          </h2>
          <p className="text-lg text-center text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Join us for an incredible hackathon experience where innovation meets collaboration.
            Build amazing projects, learn new skills, and connect with fellow developers.
          </p>
        </div>
      </section>

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
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}