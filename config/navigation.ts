export interface NavItem {
  title: string;
  href: string;
}

export interface HeaderNavItem {
  title: string;
  href: string;
}

export const headerNavItems: HeaderNavItem[] = [
  { title: 'About Me', href: '/about' },
  { title: 'Leadership Principles', href: '/leadership-principles' },
  { title: 'Architecture Decisions', href: '/architecture-decisions' },
];

export const sidebarConfig: Record<string, NavItem[]> = {
  '/about': [
    { title: 'Background', href: '#background' },
    { title: 'Experience', href: '#experience' },
    { title: 'Leadership Impact', href: '#leadership-impact' },
    { title: 'How I Lead', href: '#how-i-lead' },
    { title: 'Technical Depth', href: '#technical-depth' },
    { title: 'Connect', href: '#connect' },
  ],
  '/leadership-principles': [
    { title: 'Stay Technical', href: '#stay-technical' },
    { title: 'Build for Predictability', href: '#build-predictability' },
    { title: 'Invest in the Craft', href: '#invest-craft' },
    { title: 'Teams Compound', href: '#teams-compound' },
    { title: 'Own the Outcome', href: '#own-outcome' },
  ],
  '/architecture-decisions': [
    { title: 'Embedded Insurance Platform', href: '#embedded-insurance' },
    { title: 'Partnership-One', href: '#partnership-one' },
    { title: 'Ackcelerator', href: '#ackcelerator' },
    { title: 'Credit Life & Combi', href: '#credit-life' },
    { title: 'Payments & Checkout', href: '#payments-checkout' },
    { title: 'SureOS Migration', href: '#sureos-migration' },
    { title: 'Guiding Principles', href: '#principles' },
  ],
};
