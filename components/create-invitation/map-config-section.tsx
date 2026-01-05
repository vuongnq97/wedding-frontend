'use client';

import React, { useRef, useEffect } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { BaseInput } from '@/components/ui/base-input';
import { Map, MapPin } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapConfigSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
}

const libraries: 'places'[] = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Declare the web component to satisfy TypeScript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'gmp-place-autocomplete': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function MapConfigSection({ data, updateField }: MapConfigSectionProps) {
  const t = useTranslations('manage-invitation.sections.map');

  // if (!data) return null; // Removed

  const placeAutocompleteRef = useRef<HTMLElement>(null);

  const mapData = data?.map;

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
          updateField(['map', 'latitude'], lat);
          updateField(['map', 'longitude'], lng);

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

  const mapCenter = {
    lat: mapData?.latitude || 0,
    lng: mapData?.longitude || 0,
  };

  const showMap =
    isLoaded && (mapData?.latitude !== 0 || mapData?.longitude !== 0);

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Map className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
      rightAction={
        <Toggle
          checked={mapData?.show ?? true}
          onChange={(val) => updateField(['map', 'show'], val)}
          label={t('showSection')}
        />
      }
    >
      <div className="mb-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BaseInput
            label={t('locationName')}
            type="text"
            className="bg-muted focus:border-primary focus:bg-background border-transparent"
            value={mapData?.locationName || ''}
            onChange={(e) =>
              updateField(['map', 'locationName'], e.target.value)
            }
            placeholder="e.g. The Botanical Gardens"
          />
          <label className="relative space-y-1.5">
            <span className="text-muted-foreground text-xs font-semibold">
              {t('address')}
            </span>
            {false ? ( // TODO: Fix loading state here, previously 'isLoaded' was not used correctly for this condition
              <div className="w-full">
                {/* @ts-expect-error - Web Component */}
                <gmp-place-autocomplete ref={placeAutocompleteRef} />
              </div>
            ) : (
              <BaseInput
                type="text"
                disabled
                className="bg-muted cursor-not-allowed rounded-lg border-transparent"
                value="Loading Google Maps..."
              />
            )}
            {/* Fallback/Correction input if needed, or display the current value */}
            {mapData?.locationAddress && (
              <p className="text-muted-foreground mt-1 truncate text-xs">
                Selected: {mapData.locationAddress}
              </p>
            )}
          </label>
        </div>

        {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
          <div className="bg-muted border-border text-muted-foreground rounded-lg border p-3 text-xs">
            ⚠ Google Maps API Key is missing. Please add{' '}
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment
            variables.
          </div>
        )}
      </div>

      <div className="bg-muted border-border group relative h-64 overflow-hidden rounded-lg border">
        {showMap ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
            <div className="bg-background flex size-12 items-center justify-center rounded-full shadow-sm">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="px-4 text-center">
              <p className="text-sm font-medium">{t('preview')}</p>
              <p className="mt-1 text-xs">{t('instruction')}</p>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
