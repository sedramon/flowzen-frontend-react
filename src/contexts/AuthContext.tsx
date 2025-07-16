'use client';

import { AuthenticatedUser } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';



interface AuthContextType {
    user: AuthenticatedUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
    isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const TOKEN_KEY = 'access_token';

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            try {
                const decode = jwtDecode<AuthenticatedUser>(token);
                setUser(decode);
                console.log('Decoded user:', decode);
            } catch (error) {
                console.error('Failed to parse token', error);
                localStorage.removeItem(TOKEN_KEY);
            }
        }
    }, []);

    async function login(email: string, password: string) {
        const API_URL = process.env.NEXT_PUBLIC_API_URL!;
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        const token = data.access_token;
        localStorage.setItem(TOKEN_KEY, token);
        const decoded = jwtDecode<AuthenticatedUser>(token);
        setUser(decoded);
    }

    function logout() {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    }

    function getToken() {
        if (typeof window === 'undefined') return null;
        return window.localStorage.getItem(TOKEN_KEY);
    }


    function isLoggedIn() {
        const token = getToken();
        if(!token) return false;
        try {
            const { exp } = jwtDecode<{exp: number}>(token);
            return exp * 1000 > Date.now();
        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, getToken, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}