import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { RefreshProvider } from '@/providers/RefreshProvider';
import { FilterProvider } from '@/providers/FilterProvider';
import DashboardLayout from '@/components/layout/DashboardLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business360 | Complete Business Visibility at a Glance',
  description: 'Enterprise Business Intelligence Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <FilterProvider>
            <RefreshProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </RefreshProvider>
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
