import { ROUTES } from './routes';

export const HEADER_NAV_LINKS = [
  { href: ROUTES.TEMPLATES, key: 'templates', authRequired: false },
  { href: ROUTES.PRICING, key: 'pricing', authRequired: false },
  { href: ROUTES.DASHBOARD, key: 'dashboard', authRequired: true },
] as const;
