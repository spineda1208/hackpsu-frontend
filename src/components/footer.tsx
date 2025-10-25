export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      
      <div className="w-full px-8 py-20 relative">
        <div className="max-w-3xl w-full mx-auto">

          {/* Content */}
          <div className="flex items-start justify-between">
            {/* Left side: Watchout branding */}
            <div className="shrink-0">
              <h1 className="relative text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-zinc-50 flex items-center gap-2">
                Watchout
                <span className="text-xl md:text-2xl" style={{ color: '#F75C69' }}>®</span>
              </h1>
            </div>

            {/* Right side: Footer columns with more spacing and moved left */}
            <div className="grid grid-cols-3 gap-12 text-sm">
              {/* Column 1 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">
                  Product
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#features" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#pricing" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#updates" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Updates
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#about" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#team" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Team
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#careers" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-black dark:text-zinc-50 mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#docs" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Docs
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#blog" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#support" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#F75C69] transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

