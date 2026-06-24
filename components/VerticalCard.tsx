import React from "react";

interface VerticalCardProps {
  children: React.ReactNode;
  img: string;
  title: string;
  link: string;
  category?: string;
  onClick?: () => void;
}

export default function VerticalCard({
  children,
  img,
  title,
  link,
  category = "Project",
  onClick,
}: VerticalCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex flex-col h-full w-full border rounded-xl overflow-hidden shadow-md bg-gray-900/50
       border-gray-700/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-gray-500 
       cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-800">
        <img
          src={img}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md">
            {category}
          </span>
        </div>
      </div>

      {/* Content container */}
      <div className="flex flex-col grow p-6 text-left">
        <h3 className="text-xl font-bold tracking-tight text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="text-gray-400 font-normal text-sm line-clamp-3 mb-6 grow">
          {children}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
          <span className="text-xs font-semibold text-blue-400 group-hover:underline">
            View Details &rarr;
          </span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent card click trigger
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-800"
          >
            Launch Project
          </a>
        </div>
      </div>
    </div>
  );
}
