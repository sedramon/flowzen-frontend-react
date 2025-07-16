'use client';

import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedLayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ['/login', '/unauthorized'];
  const isPublic = publicPaths.includes(pathname);

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (isPublic) {
      setAuthorized(true);
      return;
    }

    const logged = isLoggedIn();
    if (!logged) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }, [pathname, isLoggedIn, isPublic, router]);

  if (authorized === null || authorized === false) {
    return null;
  }

  return <>{children}</>;
}