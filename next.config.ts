import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',') || [];

const nextConfig: NextConfig = {
    images: {
        remotePatterns: imageDomains.map((domain) => ({
            protocol: 'https',
            hostname: domain.trim(),
        })),
    },
};

export default withNextIntl(nextConfig);
