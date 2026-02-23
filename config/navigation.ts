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
  { title: 'System Designs', href: '/system-designs' },
];

export const sidebarConfig: Record<string, NavItem[]> = {
  '/about': [
    { title: 'Background', href: '#background' },
    { title: 'Experience', href: '#experience' },
    { title: 'Philosophy', href: '#philosophy' },
  ],
  '/leadership-principles': [
    { title: 'Philosophy', href: '#philosophy' },
    { title: 'Building Teams That Scale', href: '#building-teams' },
    { title: 'Multiplying vs Bottlenecking', href: '#multiplying' },
    { title: 'Decision-Making at Speed', href: '#decision-making' },
    { title: 'Alignment Without Bureaucracy', href: '#alignment' },
    { title: 'Execution Under Uncertainty', href: '#execution' },
  ],
  '/system-designs': [
    { title: 'Fundamentals', href: '#fundamentals' },
    { title: 'Scalability', href: '#scalability' },
    { title: 'Reliability', href: '#reliability' },
    { title: 'Architecture Patterns', href: '#architecture-patterns' },
    { title: 'Case Studies', href: '#case-studies' },
  ],
};
