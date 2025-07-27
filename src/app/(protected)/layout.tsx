// app/(protected)/layout.tsx
'use client';

import Link from 'next/link';
import '../../styles/globals.css';
import ProtectedLayout from '@/components/ProtectedLayout';
import { useAuth } from '@/contexts/AuthContext';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';



export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (

    <ProtectedLayout>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={Link}
              href="/home"
              color="inherit"
              sx={{ textTransform: 'none', mr: 2 }}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/user-administration"
              color="inherit"
              sx={{ textTransform: 'none' }}
            >
              User Administration
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Welcome, {user.username}
                </Typography>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={logout}
                  sx={{ textTransform: 'none' }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 2 }}>
        {children}
      </Box>

    </ProtectedLayout>

  );
}
