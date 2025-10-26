import Link from 'next/link';

interface AboutProps {
  variant?: 'header' | 'body';
  title?: string;
  subtitle?: string;
  tagline?: string;
  linkText?: string;
  linkHref?: string;
  id?: string;
  showLink?: boolean;
  reverse?: boolean;
  customModel?: React.ReactNode;
}

export default function About({
  variant = 'header',
  title = 'Build the perfect tools.',
  subtitle = 'Our extension API is designed to allow anyone with web development skills to unleash the power of Raycast.',
  tagline,
  linkText = 'Read the docs',
  linkHref = '/docs',
  id = 'about',
  showLink = true,
  reverse = false,
  customModel,
}: AboutProps) {
  return (
    <section 
      id={id}
      className="w-full flex flex-col items-center justify-center px-8 py-0"
    >
      {/* Bento Box Container */}
      <div className="max-w-3xl w-full border-2 border-t-0 first:border-t-2 border-[#F75C69] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Content - Text Section */}
          <div className={`flex flex-col ${reverse ? 'order-2 lg:order-2 lg:border-l-2' : 'order-2 lg:order-1 lg:border-r-2'} border-[#F75C69]`}>
            {variant === 'header' ? (
              <>
                {/* Header Variant - Two Stacked Boxes */}
                <div className="p-6 md:p-8 border-b-2 lg:border-b-2 border-[#F75C69]">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
                    {title}
                  </h2>
                </div>
                
                {showLink ? (
                  <Link 
                    href={linkHref}
                    className="p-6 md:p-8 block transition-colors hover:bg-[#F75C69]/5 group"
                  >
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {subtitle}
                    </p>
                    
                    <div className="mt-6 inline-flex items-center gap-2 text-[#F75C69] group-hover:text-[#e54b58] transition-colors">
                      <span className="text-sm md:text-base font-medium">{linkText}</span>
                      <svg 
                        className="w-5 h-5 md:w-6 md:h-6 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_8px_rgba(247,92,105,0.6)]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        style={{ transform: 'scaleX(-1)' }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 7l9 9M7 16V7h9" 
                        />
                      </svg>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 md:p-8">
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {subtitle}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Body Variant - Single Box with Header and Tagline */}
                {showLink ? (
                  <Link 
                    href={linkHref}
                    className="p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end relative transition-colors hover:bg-[#F75C69]/5 group"
                  >
                    {/* Arrow in top right */}
                    <div className="absolute top-6 md:top-8 right-6 md:right-8">
                      <svg 
                        className="w-5 h-5 md:w-6 md:h-6 text-[#F75C69] group-hover:text-[#e54b58] transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_8px_rgba(247,92,105,0.6)]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        style={{ transform: 'scaleX(-1)' }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 7l9 9M7 16V7h9" 
                        />
                      </svg>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white leading-tight">
                        {title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {tagline || subtitle}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                    <div className="space-y-4">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white leading-tight">
                        {title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {tagline || subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Content - Image/Illustration Section */}
          <div className={`relative ${reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'} border-b-2 lg:border-b-0 border-[#F75C69]`}>
            <div className="relative w-full aspect-[4/3] flex items-center justify-center p-6 md:p-8 bg-zinc-50 dark:bg-zinc-950">
              {customModel ? (
                <div className="w-full h-full">
                  {customModel}
                </div>
              ) : (
                /* Isometric Device Mockup */
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-[90%] max-w-md">
                    {/* Label: FIG_01 */}
                    <div className="absolute -top-6 left-0 text-[10px] md:text-xs text-zinc-400 dark:text-zinc-600 tracking-widest font-mono">
                      FIG_01
                    </div>
                    
                    {/* Main Device Container */}
                    <div className="relative">
                      {/* Device Frame with perspective */}
                      <div className="relative" style={{ 
                        transform: 'perspective(1000px) rotateX(20deg) rotateY(-15deg) rotateZ(5deg)',
                        transformStyle: 'preserve-3d'
                      }}>
                        
                        {/* Background Layer */}
                        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900 rounded-lg shadow-2xl" 
                          style={{ 
                            transform: 'translateZ(-30px)',
                            border: '2px solid #F75C69'
                          }}
                        />
                        
                        {/* Main Screen */}
                        <div className="relative bg-gradient-to-br from-[#F75C69]/20 to-[#F75C69]/10 rounded-lg shadow-2xl border-2 border-[#F75C69] p-4 md:p-6">
                          {/* Search Bar */}
                          <div className="mb-3 relative">
                            <div className="bg-[#F75C69]/30 rounded-md h-8 md:h-10 border border-[#F75C69]/50" />
                            <div className="absolute -right-10 md:-right-14 top-2 text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wider font-mono whitespace-nowrap">
                              SEARCH BAR
                            </div>
                          </div>
                          
                          {/* Action Bar */}
                          <div className="mb-3 relative">
                            <div className="bg-[#F75C69]/20 rounded-md h-6 md:h-8 border border-[#F75C69]/30" />
                            <div className="absolute -left-10 md:-left-14 top-2 text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wider font-mono whitespace-nowrap">
                              ACTION BAR
                            </div>
                          </div>
                          
                          {/* List Content */}
                          <div className="space-y-2 mb-3">
                            <div className="bg-[#F75C69]/20 rounded-md h-6 md:h-8 border border-[#F75C69]/40" />
                            <div className="bg-[#F75C69]/40 rounded-md h-6 md:h-8 border border-[#F75C69]/60 shadow-lg shadow-[#F75C69]/10" />
                            <div className="bg-[#F75C69]/20 rounded-md h-6 md:h-8 border border-[#F75C69]/40" />
                          </div>
                          
                          {/* Selected Item Highlight */}
                          <div className="absolute right-0 md:right-2 bottom-16 md:bottom-20 text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wider font-mono whitespace-nowrap">
                            SELECTED ITEM
                          </div>
                          
                          <div className="absolute -bottom-6 md:-bottom-8 left-0 right-0 text-center text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wider font-mono">
                            LIST CONTENT
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

