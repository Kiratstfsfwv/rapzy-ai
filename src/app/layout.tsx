import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAPZY AI - Your Friendly Cartoon AI Assistant',
  description: 'Asisten AI ramah, cerah, dan colorful untuk berbagai kebutuhanmu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-800 min-h-screen font-sans antialiased selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}

