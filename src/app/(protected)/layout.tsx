// app/(protected)/layout.tsx
'use client';

import Link from 'next/link';
import '../../styles/globals.css';
import ProtectedLayout from '@/components/ProtectedLayout';
import { useAuth } from '@/contexts/AuthContext';



export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (

          <ProtectedLayout>
            <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <Link href="/home" style={{ marginRight: '1rem' }}>
                Home
              </Link>
              <Link href="/user-administration">User Administration</Link>
              {user && (
              <>
                <span style={{ marginRight: '1rem' }}>Welcome, {user.username}</span>
                <button onClick={logout} style={{ padding: '0.5rem 1rem' }}>
                  Logout
                </button>
              </>
            )}
            </nav>
            {children}
          </ProtectedLayout>

  );
}
