import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8 py-8">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="prose prose-gray max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
