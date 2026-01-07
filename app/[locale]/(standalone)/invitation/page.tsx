'use client';

import { InvitationContent } from '@/components/invitation';
import { useInvitation } from '@/hooks/use-invitation';

export default function PublicInvitationPage() {
  const { data, publishInvitation, isPublishing } = useInvitation();

  return (
    <InvitationContent
      data={data}
      isPublishing={isPublishing}
      onPublish={publishInvitation}
      mode="preview"
    />
  );
}
