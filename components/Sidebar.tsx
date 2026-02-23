'use client';

import { usePathname } from 'next/navigation';
import { sidebarConfig } from '@/config/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const currentPath = Object.keys(sidebarConfig).find(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );
  
  const sidebarItems = currentPath ? sidebarConfig[currentPath] : [];

  if (sidebarItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <nav className="sticky top-20 pr-4">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">On this page</h3>
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
