import Link from "next/link";
import { getImageUrl } from "../lib/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  featured?: boolean;
  created_at: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  calculateReadTime: (content: string) => string;
}

export default function BlogCard({ post, variant = 'default', calculateReadTime }: BlogCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-2 ${
        isFeatured ? 'w-full' : ''
      }`}
    >
      {/* Modern Image Container with Enhanced Overlay */}
      <div className={`relative w-full overflow-hidden ${
        isFeatured ? 'h-80 md:h-96 lg:h-[500px]' : 'h-64 md:h-72'
      }`}>
        <img
          src={getImageUrl(post.image_url) || "/blog/default-blog.png"}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          alt={post.title}
          style={{
            filter: 'none !important',
            mixBlendMode: 'normal',
            imageRendering: 'auto'
          }}
        />

        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/15 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className={`w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center shadow-2xl hover:bg-white/30 transition-colors ${
            isFeatured ? 'w-16 h-16' : ''
          }`}>
            <svg className={`${isFeatured ? 'w-8 h-8' : 'w-6 h-6'} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modern Content Container */}
      <div className={`relative flex flex-col gap-4 flex-grow bg-gradient-to-br from-white via-gray-50/30 to-white ${
        isFeatured ? 'p-8 md:p-10 lg:p-12 gap-6' : 'p-6 md:p-8'
      }`}>
        {/* Category Tag */}
        <div className="flex items-center justify-start mb-2">
          <span className={`inline-flex items-center bg-[#00A89D]/10 text-[#00A89D] font-openSans font-semibold rounded-full border border-[#00A89D]/20 ${
            isFeatured ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'
          }`}>
            {post.category || "Uncategorized"}
          </span>
        </div>

        {/* Title with Modern Typography */}
        <div className="space-y-2">
          <h3 className={`text-[#0A1E3F] font-montserrat font-bold leading-tight group-hover:text-[#00A89D] transition-colors duration-300 line-clamp-2 ${
            isFeatured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'
          }`}>
            {post.title}
          </h3>
          <div className={`bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500 ${
            isFeatured ? 'w-12 h-1' : 'w-10 h-0.5'
          }`}></div>
        </div>

        {/* Enhanced Description */}
        <div className="flex-grow">
          <p className={`text-[#4D5767] font-openSans leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors ${
            isFeatured ? 'text-lg' : 'text-sm md:text-base'
          }`}>
            {post.excerpt || "Read more to discover the full story..."}
          </p>
        </div>

        {/* Reading Time and CTA */}
        <div className={`flex items-center justify-between border-t border-gray-100 ${
          isFeatured ? 'pt-6' : 'pt-4 mt-4'
        }`}>
          <div className={`flex items-center text-[#00A89D] ${
            isFeatured ? 'gap-3' : 'gap-2'
          }`}>
            <svg className={`${isFeatured ? 'w-5 h-5' : 'w-4 h-4'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className={`font-medium ${
              isFeatured ? 'text-sm' : 'text-xs md:text-sm'
            }`}>
              {calculateReadTime(post.content)}
            </span>
            {isFeatured && (
              <>
                <span className="text-sm font-medium">•</span>
                <span className="text-sm font-medium">{new Date(post.created_at).toLocaleDateString()}</span>
              </>
            )}
          </div>

          <div className={`flex items-center text-[#00A89D] font-openSans font-semibold group-hover:gap-3 transition-all duration-200 ${
            isFeatured ? 'gap-3 text-base' : 'gap-2 text-sm'
          }`}>
            <span>Read More</span>
            <svg
              width={isFeatured ? "18" : "14"}
              height={isFeatured ? "18" : "14"}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform group-hover:translate-x-1 ${
                isFeatured ? 'w-5 h-5' : 'w-3.5 h-3.5 md:w-4 md:h-4'
              }`}
            >
              <path
                d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className={`absolute top-0 left-0 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700 ${
        isFeatured ? 'w-32 h-32 -translate-x-16 -translate-y-16' : 'w-24 h-24'
      }`}></div>
      <div className={`absolute bottom-0 right-0 bg-gradient-to-tl from-[#E3A700]/10 to-transparent rounded-tl-full transform translate-x-10 translate-y-10 group-hover:scale-125 transition-transform duration-700 ${
        isFeatured ? 'w-28 h-28 translate-x-14 translate-y-14' : 'w-20 h-20'
      }`}></div>

      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </Link>
  );
}
