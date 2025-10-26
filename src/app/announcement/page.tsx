export default function AnnouncementPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header spacing */}
      <div className="h-20" />
      
      {/* Main content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Date and category */}
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
          <span className="uppercase tracking-wider font-medium">Company Update</span>
          <span>•</span>
          <time>October 26, 2025</time>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-zinc-50 mb-6 leading-tight">
          An Important Announcement About WATCHOUT
          <span style={{ color: '#F75C69' }}>®</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
          A candid reflection on transparency, authenticity, and the fact that we're not actually a real company.
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F75C69] to-[#ff8a94] flex items-center justify-center text-white font-bold">
            W
          </div>
          <div>
            <div className="font-semibold text-black dark:text-zinc-50">The WATCHOUT Team</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Definitely Real Executives</div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            Today, we want to share something important with our community. After careful consideration
            and numerous board meetings (in our imaginations), we've decided to be completely transparent
            about the nature of our organization.
          </p>

          <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mt-12 mb-6">
            We're Not a Real Company
          </h2>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            There. We said it. Despite our professional-looking website, carefully crafted footer with
            multiple sections, and this very serious blog post you're reading, WATCHOUT® is not an
            actual registered corporation, LLC, or any other form of legal business entity.
          </p>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            You might be wondering: "But what about your Terms of Service?" We don't have one.
            "Your Privacy Policy?" Also fictional. "Customer Support?" We'd love to help, but we
            can't support customers we don't have for a product that doesn't exist.
          </p>

          <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mt-12 mb-6">
            Our Commitment to Transparency
          </h2>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            At WATCHOUT®, we believe in radical honesty. That's why we're openly admitting that:
          </p>

          <ul className="space-y-3 mb-6 text-lg text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Our "pricing" page would just be a number we made up</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Our "team" section would feature stock photos or AI-generated people</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Our "documentation" would be aspirational at best</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>We have no investors, revenue, or business model</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>This entire website is a student project</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mt-12 mb-6">
            What This Means for You
          </h2>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            If you clicked on any of our footer links expecting actual legal documents, product
            information, or corporate details, we sincerely apologize for wasting approximately 15-30
            seconds of your time. However, we hope this blog post was at least mildly entertaining and
            worth the click.
          </p>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            We're committed to maintaining this same level of radical transparency going forward. If we
            ever do become a real company, we promise to write an equally professional blog post
            announcing that development.
          </p>

          <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mt-12 mb-6">
            Looking Forward
          </h2>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            Despite not being real, we're excited about our future. We plan to continue not existing
            with the same dedication and professionalism we've demonstrated thus far. Our roadmap includes:
          </p>

          <ul className="space-y-3 mb-6 text-lg text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Not shipping products</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Not hiring employees</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Not raising venture capital</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#F75C69] mr-3 mt-1">•</span>
              <span>Potentially adding more footer links that lead here</span>
            </li>
          </ul>

          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 mb-6">
            Thank you for your understanding and for reading this far. If you have any questions,
            comments, or concerns, please feel free to not contact our non-existent support team.
          </p>

          <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
              This announcement represents the views of the WATCHOUT® team, which is to say, some
              students working on a project. No actual corporate communications professionals were
              involved in the creation of this content, and it shows.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#F75C69] hover:text-[#ff8a94] transition-colors font-medium"
          >
            <span>←</span>
            <span>Back to Home</span>
          </a>
        </div>
      </article>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}

