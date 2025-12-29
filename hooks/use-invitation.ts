
import { useState } from 'react';
import { useInvitationStore } from '@/stores/invitation-store';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/routing';

export const useInvitation = () => {
    const router = useRouter();
    const { data, updateField, reset, setData } = useInvitationStore();
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const saveInvitation = async () => {
        setIsSaving(true);
        try {
            // Mock API call to save data
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log('Saved invitation data:', data);

            // Navigate to preview or show success message
            router.push(ROUTES.INVITATION);
            return true;
        } catch (error) {
            console.error('Failed to save invitation:', error);
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    const publishInvitation = async () => {
        setIsPublishing(true);
        try {
            // Mock API call to publish
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log('Published invitation:', data);

            // Navigate to public page
            router.push('/public-invitation');
            return true;
        } catch (error) {
            console.error('Failed to publish invitation:', error);
            return false;
        } finally {
            setIsPublishing(false);
        }
    };



    const checkValidInvitation = () => {
        console.log('Checking invitation validity: 1', data);
        // General
        if (!data.heroBannerUrl) return false;

        console.log('Checking invitation validity: 2', data);

        // Groom
        if (!data.groom.fullName || !data.groom.birthOrder || !data.groom.fatherName || !data.groom.motherName || !data.groom.address) return false;

        console.log('Checking invitation validity: 3', data);

        // Bride
        if (!data.bride.fullName || !data.bride.birthOrder || !data.bride.fatherName || !data.bride.motherName || !data.bride.address) return false;

        console.log('Checking invitation validity: 4', data);

        // Notification
        if (!data.notification.line1 || !data.notification.line2) return false;

        console.log('Checking invitation validity: 5', data);

        // Reception
        if (!data.reception.date || !data.reception.time || !data.reception.address) return false;

        console.log('Checking invitation validity: 6', data);

        // Ceremony (Optional)  
        if (data.ceremony.show) {
            if (!data.ceremony.date || !data.ceremony.time) return false;
        }

        console.log('Checking invitation validity: 7', data);

        // Map (Optional)
        // if (data.map.show) {
        //     if (!data.map.locationName || !data.map.locationAddress) return false;
        // }
        console.log('Checking invitation validity: 8', data);
        // Milestones
        if (!data.milestones || data.milestones.length === 0) return false;

        console.log('Checking invitation validity: 9', data);

        // Album Photos
        if (!data.albumPhotos || data.albumPhotos.length === 0) return false;

        console.log('Checking invitation validity: 10', data);

        // Music (Optional)
        if (data.music.enabled) {
            if (!data.music.url || !data.music.name) return false;
        }

        console.log('Checking invitation validity: 11', data);

        return true;
    };

    const isValid = checkValidInvitation();

    return {
        data,
        updateField,
        reset,
        setData,
        saveInvitation,
        publishInvitation,
        isSaving,
        isPublishing,
        isValid
    };
};
