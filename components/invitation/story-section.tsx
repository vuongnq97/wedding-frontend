'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { WeddingData, Milestone } from '@/types/invitation';

interface StorySectionProps {
  data: WeddingData;
}

export function StorySection({ data }: StorySectionProps) {
  const t = useTranslations('invitation.story');

  // Sort milestones by date (assuming ISO string or YYYY-MM-DD) or just use order
  // For now we use the order in array.
  const milestones = data.milestones || [];

  if (!milestones || milestones.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-16" id="story">
      <div className="layout-container mx-auto max-w-[1024px] px-4 sm:px-10">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
            {t('subtitle')}
          </p>
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="border-primary/20 md:ml-1/2 relative ml-4 space-y-12 border-l-2 md:-translate-x-[1px]">
          {milestones.map((milestone: Milestone, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <div key={milestone.date} className="relative pl-8 md:pl-0">
                <div className="bg-primary border-background absolute top-0 -left-2 h-4 w-4 rounded-full border-4 shadow-md"></div>
                <div
                  className={`md:flex ${isEven ? '' : 'md:flex-row-reverse'} group items-center justify-between gap-10`}
                >
                  <div className={`md:w-1/2 ${isEven ? 'md:text-right' : ''}`}>
                    <div
                      className={`relative mb-4 h-48 w-full overflow-hidden rounded-xl shadow-md md:mb-0 md:h-64 md:w-4/5 ${isEven ? 'ml-auto' : 'mr-auto'}`}
                    >
                      {milestone.photoUrl ? (
                        <Image
                          src={milestone.photoUrl}
                          alt={milestone.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex-1 ${isEven ? 'flex flex-col justify-center md:w-1/2' : 'flex flex-col justify-center md:text-right'}`}
                  >
                    <span className="text-primary text-sm font-bold tracking-wide uppercase">
                      {milestone.date}
                    </span>
                    <h3 className="text-foreground mt-1 mb-2 text-xl font-bold">
                      {milestone.title}
                    </h3>
                    <p
                      className={`text-muted-foreground max-w-md leading-relaxed ${isEven ? '' : 'ml-auto'}`}
                    >
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
