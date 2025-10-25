export default function Footer() {
  return (
    <footer className="w-full relative overflow-hidden">
      <div className="w-full px-8 pt-20 pb-8 relative">
        <div className="max-w-3xl w-full mx-auto">
          {/* Four columns - 2x2 on mobile, 4x1 on desktop */}
          <div className="grid grid-cols-2 md:flex md:justify-between gap-8 md:gap-4 mb-20">
            {[
              { 
                section: 'Product', 
                links: [
                  { label: 'Features', href: '#features' },
                  { label: 'Pricing', href: '#pricing' }
                ]
              },
              { 
                section: 'Company', 
                links: [
                  { label: 'About', href: '#about' },
                  { label: 'Team', href: '#team' }
                ]
              },
              { 
                section: 'Resources', 
                links: [
                  { label: 'Docs', href: '#docs' },
                  { label: 'Support', href: '#support' }
                ]
              },
              { 
                section: 'Legal', 
                links: [
                  { label: 'Privacy', href: '#privacy' },
                  { label: 'Terms', href: '#terms' }
                ]
              }
            ].map(({ section, links }) => (
              <div key={section} className="md:shrink-0">
                <div className="h-1 w-8 bg-[#F75C69] mb-4" />
                <h3 className="text-xs uppercase tracking-widest mb-4 text-black dark:text-zinc-50 font-bold">
                  {section}
                </h3>
                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block hover:text-[#F75C69] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* WATCHOUT at bottom - responsive sizing */}
          <div className="mt-auto">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-black dark:text-zinc-50 leading-none">
              WATCHOUT
              <span style={{ color: '#F75C69' }}>®</span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}

