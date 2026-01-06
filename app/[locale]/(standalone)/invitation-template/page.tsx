'use client';

import { InvitationContent } from '@/components/invitation';

import {
  invitationTemplatePageEn,
  invitationTemplatePageVi,
} from '@/lib/template-data';
import { useLocale } from 'next-intl';

export default function PublicInvitationPage() {
  const locale = useLocale();
  const templateData =
    locale === 'vi' ? invitationTemplatePageVi : invitationTemplatePageEn;

  return (
    <div className="text-foreground bg-background flex w-full flex-col font-sans">
      <InvitationContent data={templateData} mode="template" />
    </div>
  );
}
