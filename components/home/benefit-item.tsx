import { ReactNode } from 'react';

interface BenefitItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="bg-primary/10 text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
        {icon}
      </div>
      <div>
        <h4 className="mb-1 font-serif text-lg font-bold">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
