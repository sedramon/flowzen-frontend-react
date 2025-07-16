'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout, getToken, isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/home';

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try{
      await login(email, password);
      router.push(returnUrl);
    } catch(error) {
      console.error('Login failed', error);
    }
  }

  function handleLogout() {
    logout();
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Login Page (Test Auth Methods)</h1>

      <form onSubmit={handleLogin} style={{ marginBottom: '1.5rem' }}>
        <label>
          Email<br/>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </label>
        <label>
          Password<br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ width: '100%' }}>
          Log In & Test
        </button>
      </form>

      <button onClick={handleLogout} style={{ width: '100%', marginBottom: '2rem' }}>
        Log Out & Test
      </button>

      <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <strong>Current User Object:</strong>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <strong>isLoggedIn():</strong> {isLoggedIn() ? '✅ true' : '❌ false'}<br/>
        <strong>getToken():</strong> {getToken() ?? '– no token –'}
      </div>
    </div>
  );
}