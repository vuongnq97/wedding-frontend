
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
    rightAction
}) => {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="p-5 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full ${iconBgColor} flex items-center justify-center ${iconTextColor}`}>
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
                </div>
                {rightAction && <div>{rightAction}</div>}
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default SectionWrapper;
