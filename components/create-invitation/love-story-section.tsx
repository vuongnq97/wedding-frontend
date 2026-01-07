'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { Plus, Trash2, Camera, History, Calendar } from 'lucide-react';
import { WeddingData, Milestone } from '@/types/invitation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Toggle from '@/components/ui/toggle';

interface LoveStorySectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
  uploadImage: (file: File) => Promise<string | null>;
}

interface MilestoneItemProps {
  milestone: Milestone;
  index: number;
  updateMilestone: (
    index: number,
    field: keyof Milestone,
    value: string
  ) => void;
  removeMilestone: (index: number) => void;
  uploadImage: (file: File) => Promise<string | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

function MilestoneItem({
  milestone,
  index,
  updateMilestone,
  removeMilestone,
  uploadImage,
  t,
}: MilestoneItemProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }

      setIsUploading(true);
      const url = await uploadImage(file);
      setIsUploading(false);

      if (url) {
        updateMilestone(index, 'photoUrl', url);
      }
    }
    e.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <div className="bg-surface border-primary/20 absolute top-6 -left-[35px] flex size-7 items-center justify-center rounded-full border-4">
        <div className="size-2.5 rounded-full bg-pink-500"></div>
      </div>

      <div className="bg-muted border-border group relative flex flex-col gap-6 rounded-xl border p-5 md:flex-row">
        <BaseButton
          onClick={() => removeMilestone(index)}
          className="absolute top-2 right-2 z-10 p-2 opacity-0 transition-all group-hover:opacity-100"
          variant="ghost"
          size="icon"
        >
          <Trash2 className="text-muted-foreground hover:text-destructive h-4 w-4" />
        </BaseButton>

        <div className="shrink-0">
          <div
            onClick={handleUploadClick}
            className="bg-surface border-border text-muted-foreground relative flex size-16 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors hover:border-pink-500 hover:text-pink-500 md:size-32"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            {isUploading ? (
              <div className="flex h-full w-full items-center justify-center bg-black/20">
                <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            ) : milestone.photoUrl ? (
              <Image
                src={milestone.photoUrl}
                alt={milestone.title}
                fill
                className="object-cover"
              />
            ) : (
              <>
                <Camera className="mb-1 h-6 w-6" />
                <span className="text-[10px] font-medium">{t('addPhoto')}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BaseInput
              label={t('dateYear')}
              type="date"
              className="bg-surface focus:border-primary focus:bg-background border-transparent px-3 py-2.5 focus:ring-0"
              value={milestone.date}
              onChange={(e) => updateMilestone(index, 'date', e.target.value)}
              rightIcon={<Calendar className="h-4 w-4" />}
            />
            <BaseInput
              label={t('milestoneTitle')}
              type="text"
              className="bg-surface focus:border-primary focus:bg-background border-transparent px-3 py-2.5 focus:ring-0"
              placeholder={t('milestonePlaceholder')}
              value={milestone.title}
              onChange={(e) => updateMilestone(index, 'title', e.target.value)}
            />
          </div>
          <label className="block space-y-1.5">
            <span className="text-muted-foreground text-xs font-semibold">
              {t('storyDescription')}
            </span>
            <textarea
              className="bg-surface focus:border-primary focus:bg-background w-full resize-none rounded-lg border-transparent px-3 py-2.5 text-sm focus:ring-0"
              rows={2}
              placeholder={t('descriptionPlaceholder')}
              value={milestone.description}
              onChange={(e) =>
                updateMilestone(index, 'description', e.target.value)
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export function LoveStorySection({
  data,
  updateField,
  uploadImage,
}: LoveStorySectionProps) {
  const t = useTranslations('manage-invitation.sections.story');

  const milestones = data?.milestones || [];
  const showLoveStory = data?.showLoveStory ?? true;

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      title: 'New Milestone',
      description: '',
      photoUrl: '',
    };
    updateField(['milestones'], [...milestones, newMilestone]);
  };

  const updateMilestone = (
    index: number,
    field: keyof Milestone,
    value: string
  ) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    updateField(['milestones'], updatedMilestones);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    updateField(['milestones'], updatedMilestones);
  };

  const handleToggle = (checked: boolean) => {
    updateField(['showLoveStory'], checked);
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<History className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
      rightAction={
        <Toggle
          label={t('showSection')}
          checked={showLoveStory}
          onChange={handleToggle}
        />
      }
    >
      {showLoveStory && (
        <>
          <div className="mb-6">
            <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
          </div>

          <div className="before:bg-primary/20 relative space-y-8 pl-8 before:absolute before:top-4 before:bottom-4 before:left-3.5 before:w-px">
            {milestones.map((milestone, index) => (
              <MilestoneItem
                key={milestone.date}
                milestone={milestone}
                index={index}
                updateMilestone={updateMilestone}
                removeMilestone={removeMilestone}
                uploadImage={uploadImage}
                t={t}
              />
            ))}
          </div>

          <BaseButton
            onClick={addMilestone}
            className="mt-6 h-auto w-full py-3"
            variant="dashed"
          >
            <Plus className="h-5 w-5" /> {t('addEvent')}
          </BaseButton>
        </>
      )}
    </SectionWrapper>
  );
}
