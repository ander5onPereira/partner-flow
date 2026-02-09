import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../store/useStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const setTheme = useStore((s) => s.setTheme);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    try {
      const stored =
        typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = stored
        ? stored === 'dark'
          ? 'dark'
          : 'light'
        : prefersDark
          ? 'dark'
          : 'light';
      if (initial === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      setTheme(initial as any);
    } catch (e) {}
  }, [setTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer theme='colored' />
    </QueryClientProvider>
  );
}
