import Link from "next/link";

export default function ShapeFutureCTA() {
    return (
        <div className="bg-[#00A89D] w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
            <img
                src="/backgrounds/cta-shape-future-bg.png"
                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
                alt="Shape Future Background"
            />
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto text-center">
                <div className="space-y-2">
                    <h2 className="text-white font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                        Let's Shape the Future of
                        <span className="block bg-gradient-to-r from-[#E3A700] to-white bg-clip-text text-transparent">
                            Clean Energy Together
                        </span>
                    </h2>
                    <p className="text-white/80 font-openSans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Join us in building sustainable energy solutions for Africa's future.
                    </p>
                </div>
                <Link
                    href="/contact"
                    className="group inline-flex py-5 px-10 md:py-6 md:px-12 justify-center items-center gap-4 md:gap-5 bg-white hover:bg-gray-50 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
                >
                    <span className="text-[#00A89D] font-openSans text-lg md:text-xl font-bold leading-tight tracking-tight">
                        CONTACT US
                    </span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:w-7 md:h-7 transform group-hover:translate-x-2 transition-transform duration-300"
                    >
                        <path
                            d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                            stroke="#00A89D"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
