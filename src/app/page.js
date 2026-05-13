import Header from '@/components/layout/header';
import Hero from '@/components/layout/hero';
import Feature from '@/components/layout/feature';

export default function Home() {
  return (
    <main className='min-h-screen relative'>
      <Header />
      <Hero />
      <Feature />
    </main>
  );
}
