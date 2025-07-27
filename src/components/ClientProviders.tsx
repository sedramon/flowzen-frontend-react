'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from '@/contexts/AuthContext';
import theme from '@/lib/theme';


export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
}
