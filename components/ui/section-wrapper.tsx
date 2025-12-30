import React from 'react';

interface SectionWrapperProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  icon,
  iconBgColor,
  iconTextColor,
  children,
  rightAction,
}) => {
  return (
    <div className="bg-surface border-border rounded-xl border shadow-sm">
      <div className="border-border flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-3">
          <div
            className={`size-8 rounded-full ${iconBgColor} flex items-center justify-center ${iconTextColor}`}
          >
            {icon}
          </div>
          <h3 className="text-foreground text-lg font-bold">{title}</h3>
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default SectionWrapper;
