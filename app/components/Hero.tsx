interface HeroProps {
  title: string;
  subtitle: string;
  badge: string;
  image?: string;
}

export default function Hero({ title, subtitle, badge, image = "/heroes/home-hero.webp" }: HeroProps) {
  return (
    <div className="relative h-[60vh] md:h-[50vh] lg:h-[45vh] flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          className="w-full h-full object-cover"
          alt="Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60 md:from-black/70 md:via-black/60 md:to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="inline-block mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            {badge}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {title.includes(" ") ? (
            <>
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-[#00A89D] to-[#E3A700] bg-clip-text text-transparent">
                {title.split(" ").slice(-1)}
              </span>
            </>
          ) : (
            title
          )}
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed italic">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
