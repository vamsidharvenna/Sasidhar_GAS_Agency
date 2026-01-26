import React from 'react';
import { ChatWidget } from './components/layout/ChatWidget';
import { FloatingCTA } from './components/layout/FloatingCTA';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Contact } from './components/sections/Contact';
import { CTABlock } from './components/sections/CTABlock';
import { DeliveryInfo } from './components/sections/DeliveryInfo';
import { HeroSlider } from './components/sections/HeroSlider';
import { RefillOptions } from './components/sections/RefillOptions';
import { Products } from './components/sections/Products';
import { QuickActions } from './components/sections/QuickActions';
import { Safety } from './components/sections/Safety';
import { Staff } from './components/sections/Staff';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

const App: React.FC = () =>
{
  return (
    <LanguageProvider>
      <ChatProvider>
        <div className="relative min-h-screen bg-[#f9f9f9] text-[#333] pb-20">
          <Header />

          <main>
            <section id="home" className="relative p-0 m-0 border-b-0">
              <HeroSlider />
              <CTABlock />
            </section>

            <QuickActions />
            <DeliveryInfo />
            <RefillOptions />
            <Products />
            <Staff />
            <Safety />
            <Contact />
          </main>

          <Footer />
          <FloatingCTA />
          <ChatWidget />
        </div>
      </ChatProvider>
    </LanguageProvider>
  );
};

export default App;
console.log("WEB ALERTS URL =", import.meta.env.VITE_WEB_ALERTS_API_BASE_URL);
