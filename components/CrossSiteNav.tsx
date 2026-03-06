import Link from "next/link";

export default function CrossSiteNav() {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-6 items-center">
        <Link
          href="https://ankul01.github.io/profile/"
          className="text-gray-600 hover:text-gray-900"
        >
          ← Home
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          href="https://ankul01.github.io/profile/"
          className="text-gray-600 hover:text-gray-900"
        >
          Home
        </Link>
        <Link
          href="https://ankul01.github.io/engineering-with-intent/"
          className="text-gray-600 hover:text-gray-900"
        >
          Engineering with Intent
        </Link>
        <Link
          href="https://portfolio.ankul.co.in"
          className="text-gray-900 font-medium"
        >
          Portfolio
        </Link>
      </div>
    </nav>
  );
}
