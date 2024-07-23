'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';
import { Inter } from 'next/font/google';
import { isLoggedIn } from './utils/session';
import "./globals.css";
import { getAvatar, getNickname } from './utils/storage';

const inter = Inter({ subsets: ["latin"] });

const socket = io({
  path: '/api/socket',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const nickname = getNickname();
    const avatar = getAvatar();

    if (!nickname || !avatar) {
      router.push('/');
    } else {
      socket.emit('login', { id: socket.id, nickname, avatar, status: 'available' });

      const handleVisibilityChange = () => {
        if (document.hidden) {
          socket.emit('setStatus', 'busy');
        } else {
          socket.emit('setStatus', 'available');
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        socket.emit('logout');
      };
    }
  }, [router]);

  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/home');
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
