const Hero = ({ settings }) => {
  const name    = settings?.restaurantName || 'Our Restaurant'
  const tagline = settings?.tagline || 'Fresh ingredients, unforgettable flavors.'

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: settings?.heroImage
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${settings.heroImage}) center/cover no-repeat`
          : 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
      }}
    >
      {/* Decorative grain overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative text-center px-4 max-w-3xl mx-auto animate-slide-up">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-brand-400/60" />
          <span className="text-brand-400 text-sm font-medium tracking-[0.2em] uppercase">Welcome</span>
          <div className="h-px w-16 bg-brand-400/60" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white mb-6 leading-tight">
          {name}
        </h1>

        <p className="text-stone-300 text-lg sm:text-xl mb-10 leading-relaxed">
          {tagline}
        </p>

        <a
          href="#menu"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brand-900/30 active:scale-95"
        >
          View Our Menu
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-white/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
      </div>
    </section>
  )
}

export default Hero
