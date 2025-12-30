interface FamilyGroupProps {
  title: string;
  subLabel?: string;
  fatherName: string;
  motherName: string;
}

export function FamilyGroupCard({
  title,
  subLabel,
  fatherName,
  motherName,
}: FamilyGroupProps) {
  return (
    <div className="hover:bg-muted flex flex-col gap-4 rounded-2xl transition-colors duration-300 md:p-6">
      <h3 className="text-foreground font-display text-primary text-xl text-xs font-bold tracking-widest uppercase">
        {title}
      </h3>
      <div className="space-y-3">
        {subLabel && (
          <p className="text-muted-foreground text-sm text-[10px] font-semibold tracking-widest uppercase">
            {subLabel}
          </p>
        )}
        <div className="font-display">
          <p className="text-foreground text-lg font-light md:text-2xl md:text-3xl">
            {fatherName}
          </p>
          <p className="text-primary/70 py-1 text-lg">&</p>
          <p className="text-foreground text-lg font-light md:text-2xl md:text-3xl">
            {motherName}
          </p>
        </div>
      </div>
    </div>
  );
}
