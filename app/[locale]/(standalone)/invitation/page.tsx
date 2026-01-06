'use client';

import { InvitationContent } from '@/components/invitation';
import { useInvitation } from '@/hooks/use-invitation';

export default function PublicInvitationPage() {
  const { data, publishInvitation } = useInvitation();

  return (
    <InvitationContent
      data={data}
      onPublish={publishInvitation}
      mode="preview"
    />
  );
}
