import Image from 'next/image';

interface CoupleProfileCardProps {
  photoUrl?: string;
  fullName: string;
  birthOrder?: string;
  role: string;
  bio: string;
  fallbackName: string;
}

export function CoupleProfileCard({
  photoUrl,
  fullName,
  birthOrder,
  role,
  bio,
  fallbackName,
}: CoupleProfileCardProps) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="border-background ring-border relative mb-6 h-64 w-64 overflow-hidden rounded-full border-[6px] shadow-xl ring-1">
        <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-110">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={fullName || fallbackName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-foreground mb-1 text-2xl font-bold">
        {fullName || fallbackName}
      </h3>
      <p className="text-muted-foreground text-sm text-[10px] font-semibold tracking-widest uppercase">
        {birthOrder}
      </p>
      <p className="text-primary text-xs font-medium tracking-wide uppercase">
        {role}
      </p>
      <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed italic">
        {bio}
      </p>
    </div>
  );
}
