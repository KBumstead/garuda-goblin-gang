import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselItem {
  type: 'Tournament' | 'Training';
  title: string;
  organizer: string;
  image: string;
}

interface DashboardCarouselProps {
  items: CarouselItem[];
}

const typeColors: Record<string, string> = {
  Tournament: 'bg-[#f46036] text-white',
  Training: 'bg-[#1b1b1e] text-[#f46036]',
};

export const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Update selected index for dots
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      if (emblaApi && emblaApi.off) emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <div className="overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
        <div className="flex">
          {items.map((item, idx) => (
            <div
              className="min-w-0 shrink-0 grow-0 basis-full relative h-64 sm:h-80 flex items-end"
              key={idx}
              style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />
              {/* Badge */}
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow ${typeColors[item.type]}`}>{item.type}</span>
              {/* Content */}
              <div className="relative z-10 p-6 w-full flex flex-col items-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">{item.title}</h2>
                <div className="text-white/80 text-sm mb-4 drop-shadow">{item.organizer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Prev/Next Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20 shadow-lg"
        onClick={scrollPrev}
        aria-label="Previous slide"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20 shadow-lg"
        onClick={scrollNext}
        aria-label="Next slide"
        style={{ backdropFilter: 'blur(2px)' }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${selectedIndex === idx ? 'bg-[#f46036] scale-125' : 'bg-[#6d676e]/30'}`}
            onClick={() => emblaApi && emblaApi.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}; 