import Header from '@/components/layout/header';
import Hero from '@/components/layout/hero';
import Feature from '@/components/layout/feature';
import Pricing from '@/components/layout/pricing';
import Testimonials from '@/components/layout/testimonials';
import FAQ from '@/components/layout/faq';
import Subscribe from '@/components/layout/subscribe';
import Footer from '@/components/layout/footer';
import FeatureSection from '@/components/layout/feature2';

export default function Home() {
  return (
    <main className='min-h-screen bg-black relative'>

      <Header />
      <Hero />
      <FeatureSection />
      <Feature />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Subscribe />
      <Footer />
    </main>
  );
}
