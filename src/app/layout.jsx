import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'GhostInterview — AI-Powered Interview Preparation',
  description:
    'Purpose-built for preparing and practicing interviews. Real-time AI feedback, tailored to your career goals.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        className='relative min-h-full flex flex-col bg-black '
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
