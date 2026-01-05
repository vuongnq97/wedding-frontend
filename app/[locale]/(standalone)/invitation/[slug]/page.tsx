'use client';

import { InvitationContent } from '@/components/invitation';
import { useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useInvitation } from '@/hooks/use-invitation';

export default function DynamicInvitationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const searchParams = useSearchParams();
  const isEdit = Boolean(searchParams.get('edit'));
  const { user } = useAuth();

  const { data, loading, error } = useInvitation({
    enableFetch: true,
    slug,
    isEdit,
    userId: user?.userId,
  });

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="text-destructive text-2xl font-bold">Error</h1>
        <p className="text-muted-foreground">
          {error || 'Invitation not found'}
        </p>
      </div>
    );
  }

  return (
    <InvitationContent
      data={data}
      isPublic={!isEdit}
      isCreator={isEdit}
      onPublish={() => {}}
    />
  );
}
