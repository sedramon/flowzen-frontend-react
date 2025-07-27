import type { Metadata } from 'next';
import '../styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';
import ClientProviders from '@/components/ClientProviders';



export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}