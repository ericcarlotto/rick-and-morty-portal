import type { ReactNode } from 'react';
import { fontVariables } from '../src/ui/fonts';
import './globals.css';

export const metadata = {
  title: 'Elenco',
  description: 'Episódios e personagens',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body className={fontVariables()}>{children}</body>
    </html>
  );
}
