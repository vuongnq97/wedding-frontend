'use client';

import React, { useState, useEffect, useRef } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { BaseInput } from '@/components/ui/base-input';
import { Map as MapIcon, MapPin, Loader2, Search } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { useTranslations } from 'next-intl';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { toast } from 'sonner';

interface MapConfigSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
}

interface Suggestion {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export function MapConfigSection({ data, updateField }: MapConfigSectionProps) {
  const t = useTranslations('manage-invitation.sections.map');
  const mapData = data?.map;
  const trackAsiaKey = process.env.NEXT_PUBLIC_TRACK_ASIA_KEY || '';

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      if (query === mapData?.locationAddress) {
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://maps.track-asia.com/api/v2/place/autocomplete/json?input=${encodeURIComponent(
            query
          )}&key=${trackAsiaKey}`
        );
        const data = await response.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, trackAsiaKey, mapData?.locationAddress]);

  const handleSelectPlace = async (place: Suggestion) => {
    setQuery(place.description);
    setShowSuggestions(false);
    updateField(['map', 'locationAddress'], place.description);

    updateField(['map', 'locationName'], place.structured_formatting.main_text);

    try {
      const response = await fetch(
        `https://maps.track-asia.com/api/v2/place/textsearch/json?query=${encodeURIComponent(
          place.description
        )}&key=${trackAsiaKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        updateField(['map', 'latitude'], location.lat);
        updateField(['map', 'longitude'], location.lng);

        const embedUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
        updateField(['map', 'link'], embedUrl);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      toast.error('Failed to fetch place details');
    }
  };

  const mapCenter = {
    latitude: mapData?.latitude || 10.762622, // Default to HCM City if 0
    longitude: mapData?.longitude || 106.660172,
    zoom: 15,
  };

  const hasValidCoordinates =
    mapData?.latitude !== 0 || mapData?.longitude !== 0;

  return (
    <SectionWrapper
      title={t('title')}
      icon={<MapIcon className="h-5 w-5" />}
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
      {(mapData?.show ?? true) && (
        <>
          <div className="mb-4 space-y-4">
            {!trackAsiaKey && (
              <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-xs">
                ⚠ Track Asia API Key is missing. Please add{' '}
                <code>NEXT_PUBLIC_TRACK_ASIA_KEY</code> to your environment
                variables.
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <BaseInput
                label={t('locationName')}
                type="text"
                className="bg-muted focus:border-primary focus:bg-background border-transparent"
                value={mapData?.locationName || ''}
                onChange={(e) =>
                  updateField(['map', 'locationName'], e.target.value)
                }
                placeholder={t('locationNamePlaceholder')}
              />

              <div className="relative space-y-1.5" ref={searchContainerRef}>
                <span className="text-muted-foreground text-xs font-semibold">
                  {t('address')}
                </span>
                <div className="relative">
                  <BaseInput
                    type="text"
                    className="bg-muted focus:border-primary focus:bg-background border-transparent pr-8"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    placeholder="Search address..."
                  />
                  <div className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2">
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="bg-muted text-popover-foreground absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-md">
                    <ul className="p-1">
                      {suggestions.map((place, index) => (
                        <li
                          key={index}
                          className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer flex-col gap-0.5 rounded-sm px-2 py-1.5 text-sm transition-colors"
                          onClick={() => handleSelectPlace(place)}
                        >
                          <span className="font-medium">
                            {place.structured_formatting.main_text}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {place.structured_formatting.secondary_text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {mapData?.locationAddress &&
                  mapData.locationAddress !== query && (
                    <p className="text-muted-foreground mt-1 truncate text-xs">
                      Current: {mapData.locationAddress}
                      <button
                        className="text-primary ml-2 hover:underline"
                        onClick={() => setQuery(mapData.locationAddress || '')}
                        type="button"
                      >
                        (Edit)
                      </button>
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="bg-muted border-border group relative h-64 overflow-hidden rounded-lg border">
            {hasValidCoordinates ? (
              <Map
                initialViewState={mapCenter}
                key={`${mapData?.latitude}-${mapData?.longitude}`}
                style={{ width: '100%', height: '100%' }}
                mapStyle={`https://maps.track-asia.com/styles/v2/streets.json?key=${trackAsiaKey}`}
                mapLib={maplibregl}
              >
                <Marker
                  longitude={mapData?.longitude || 0}
                  latitude={mapData?.latitude || 0}
                  color="red"
                />
                <NavigationControl position="top-right" />
              </Map>
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

            <div className="pointer-events-none absolute right-1 bottom-1 rounded bg-white/50 px-1 py-0.5 text-[10px] text-gray-500">
              © Track Asia
            </div>
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
