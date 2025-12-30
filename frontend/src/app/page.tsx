'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Task Management System (Live)</h1>
      <p className="mb-8 text-lg text-gray-600">The system is live and running.</p>
      <Link
        href="/login"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
      >
        Go to Login
      </Link>
    </div>
  );
}
