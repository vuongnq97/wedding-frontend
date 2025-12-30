'use client';

import React, { useRef, useEffect } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { Map, MapPin } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapConfigSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

const libraries: ('places')[] = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

// Declare the web component to satisfy TypeScript
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'gmp-place-autocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export function MapConfigSection({ data, updateField }: MapConfigSectionProps) {
    const t = useTranslations('create-invitation.sections.map');
    const placeAutocompleteRef = useRef<HTMLElement>(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries,
    });

    useEffect(() => {
        if (isLoaded && placeAutocompleteRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const listener = async (event: any) => {
                const place = event.place;
                if (!place) return;

                // Fetch fields we need
                await place.fetchFields({
                    fields: ['displayName', 'formattedAddress', 'location', 'id'],
                });

                const displayName = place.displayName || '';
                const address = place.formattedAddress || '';
                const location = place.location;

                if (location) {
                    const lat = location.lat();
                    const lng = location.lng();

                    updateField(['map', 'locationAddress'], address);
                    updateField(['map', 'locationName'], displayName);
                    updateField(['map', 'coords'], { lat, lng });

                    // Generate embed link
                    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=place_id:${place.id}`;
                    updateField(['map', 'link'], embedUrl);
                }
            };

            const element = placeAutocompleteRef.current;
            const eventListener = listener as EventListener; // Type assertion to satisfy addEventListener
            element.addEventListener('gmp-placeselect', eventListener);

            return () => {
                element.removeEventListener('gmp-placeselect', eventListener);
            };
        }
    }, [isLoaded, updateField]);

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Map className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
            rightAction={
                <Toggle
                    checked={data.map.show}
                    onChange={(val) => updateField(['map', 'show'], val)}
                    label={t('showSection')}
                />
            }
        >
            <div className="space-y-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-1.5">
                        <span className="text-xs font-semibold text-muted-foreground">
                            {t('locationName')}
                        </span>
                        <input
                            type="text"
                            className="w-full bg-muted border border-transparent focus:border-primary focus:bg-background focus:ring-0 rounded-lg text-sm px-3 py-2.5"
                            value={data.map.locationName}
                            onChange={(e) => updateField(['map', 'locationName'], e.target.value)}
                            placeholder="e.g. The Botanical Gardens"
                        />
                    </label>
                    <label className="space-y-1.5 relative">
                        <span className="text-xs font-semibold text-muted-foreground">
                            {t('address')}
                        </span>
                        {false ? (
                            <div className="w-full">
                                {/* @ts-expect-error - Web Component */}
                                <gmp-place-autocomplete ref={placeAutocompleteRef} />
                            </div>
                        ) : (
                            <input
                                type="text"
                                disabled
                                className="w-full bg-muted border border-transparent rounded-lg text-sm px-3 py-2.5 cursor-not-allowed"
                                value="Loading Google Maps..."
                            />
                        )}
                        {/* Fallback/Correction input if needed, or display the current value */}
                        {data.map.locationAddress && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                                Selected: {data.map.locationAddress}
                            </p>
                        )}
                    </label>
                </div>

                {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
                    <div className="bg-muted p-3 rounded-lg border border-border text-xs text-muted-foreground">
                        ⚠ Google Maps API Key is missing. Please add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables.
                    </div>
                )}
            </div>

            <div className="bg-muted rounded-lg border border-border overflow-hidden relative group h-64">
                {isLoaded && data.map.coords ? (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={data.map.coords}
                        zoom={15}
                    >
                        <Marker position={data.map.coords} />
                    </GoogleMap>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center text-muted-foreground gap-2">
                        <div className="size-12 bg-background rounded-full flex items-center justify-center shadow-sm">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div className="text-center px-4">
                            <p className="text-sm font-medium">
                                {t('preview')}
                            </p>
                            <p className="text-xs mt-1">
                                {t('instruction')}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
