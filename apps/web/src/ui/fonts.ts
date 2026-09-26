import { Atkinson_Hyperlegible, Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google';

const title = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-title',
  display: 'swap',
});
const text = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-text',
  display: 'swap',
});
const code = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-code',
  display: 'swap',
});

export function fontVariables(): string {
  return `${title.variable} ${text.variable} ${code.variable}`;
}
