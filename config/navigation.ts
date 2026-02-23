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
    { title: 'Building a Team from Scratch', href: '#building-team' },
    { title: 'Prioritization Frameworks', href: '#prioritization' },
    { title: 'Cross-team Alignment', href: '#cross-team-alignment' },
    { title: 'Decision-Making', href: '#decision-making' },
    { title: 'Communication', href: '#communication' },
  ],
  '/system-designs': [
    { title: 'Fundamentals', href: '#fundamentals' },
    { title: 'Scalability', href: '#scalability' },
    { title: 'Reliability', href: '#reliability' },
    { title: 'Architecture Patterns', href: '#architecture-patterns' },
    { title: 'Case Studies', href: '#case-studies' },
  ],
};
