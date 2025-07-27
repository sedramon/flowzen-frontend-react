'use client';

import { useAuth } from "@/contexts/AuthContext";
import { Box, Button, TextField, Typography } from "@mui/material";
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

  const token = getToken();

  return (
    <Box sx={{maxWidth: 600, mx: 'auto', my: 4, px: 2}}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login Page (Test Auth Metods)
      </Typography>
      <Box>
        <TextField 
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField 
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{mt: 2}}>
          Login
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth sx={{mt: 2, mb: 3}}>
          Logout
        </Button>
      </Box>
      <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current User Object:
        </Typography>
        <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(user, null, 2)}
        </Box>

        <Typography>
          <strong>isLoggedIn():</strong> {isLoggedIn() ? '✅ true' : '❌ false'}
        </Typography>
        <Typography>
          <strong>getToken():</strong> {token ?? '– no token –'}
        </Typography>
      </Box>
    </Box>
  );
}