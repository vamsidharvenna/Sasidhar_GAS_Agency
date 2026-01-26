import React from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';

export const RefillOptions: React.FC = () => {
  return (
    <Section id="refill" className="scroll-mt-[220px] pt-10">
      <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
        HP Gas Refill Booking Options
      </h2>

      <Card className="bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <ol className="space-y-3 text-sm text-slate-800 list-decimal pl-5">
          <li className="pl-1 leading-6">
            <span className="font-semibold">HP Pay Mobile App:</span>{' '}
            <span>This mobile APP is available under Play Store for Android & IOS.</span>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.drivetrackplusrefuel&pcampaignid=web_share"
                target="_blank"
                rel="noreferrer"
                className="text-[#004A99] underline hover:text-[#003366] flex items-center gap-2"
              >
                <img
                  src="https://storage.googleapis.com/sasidharstorage/logos/play%20store.png"
                  alt="Google Play"
                  className="h-4 w-auto"
                />
                <span>Play Store</span>
              </a>
              <a
                href="https://apps.apple.com/in/app/hp-pay/id1343241227"
                target="_blank"
                rel="noreferrer"
                className="text-[#004A99] underline hover:text-[#003366] flex items-center gap-2"
              >
                <img
                  src="https://storage.googleapis.com/sasidharstorage/logos/App%20store.png"
                  alt="App Store"
                  className="h-4 w-auto"
                />
                <span>App Store</span>
              </a>
            </div>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">HP ANY Time (IVRS):</span>{' '}
            <span>Dial from your registered mobile to IVRS </span>
            <a
              href="tel:+918888823456"
              className="text-[#004A99] underline hover:text-[#003366] font-semibold"
            >
              88888 23456
            </a>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">Missed Call:</span>{' '}
            <span>Just give a missed call on </span>
            <a
              href="tel:+919493602222"
              className="text-[#004A99] underline hover:text-[#003366] font-semibold"
            >
              94936 02222
            </a>{' '}
            <span>from your registered mobile number.</span>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">Website:</span>{' '}
            <a
              href="https://www.myhpgas.in"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366]"
            >
              www.myhpgas.in
            </a>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">Umang Mobile App:</span>{' '}
            <span>This mobile APP is available under Play Store for Android & IOS.</span>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=in.gov.umang.negd.g2c&pcampaignid=web_share"
                target="_blank"
                rel="noreferrer"
                className="text-[#004A99] underline hover:text-[#003366] flex items-center gap-2"
              >
                <img
                  src="https://storage.googleapis.com/sasidharstorage/logos/play%20store.png"
                  alt="Google Play"
                  className="h-4 w-auto"
                />
                <span>Play Store</span>
              </a>
              <a
                href="https://apps.apple.com/us/app/umang-india/id1544944177"
                target="_blank"
                rel="noreferrer"
                className="text-[#004A99] underline hover:text-[#003366] flex items-center gap-2"
              >
                <img
                  src="https://storage.googleapis.com/sasidharstorage/logos/App%20store.png"
                  alt="App Store"
                  className="h-4 w-auto"
                />
                <span>App Store</span>
              </a>
            </div>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">WhatsApp:</span>{' '}
            <span>Just Say, Hi to </span>
            <a
              href="https://wa.me/919222201122?text=Hi"
              target="_blank"
              rel="noreferrer"
              className="text-[#004A99] underline hover:text-[#003366] inline-flex items-center gap-2"
            >
              <img
                src="https://storage.googleapis.com/sasidharstorage/logos/WhatsApp.png"
                alt="WhatsApp"
                className="h-4 w-auto"
              />
              <span>92222 01122</span>
            </a>{' '}
            <span>from your registered mobile number to initiate the booking process.</span>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">Amazon, Paytm, PhonePe or any BBPS enabled Wallets/ Bank Apps</span>{' '}
            <span>under pay bill section/utilities.</span>
          </li>

          <li className="pl-1 leading-6">
            <span className="font-semibold">Customer Service Centers:</span>{' '}
            <span>Nearby CSC can be contacted for booking.</span>
          </li>

          <li className="pl-1 leading-6 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold">At your HP Gas Distributorship:</span>
            <span className="flex flex-wrap items-center gap-2">
              Sasidhar Gas Agency (HP)
              <a
                href="tel:+918649255551"
                className="text-[#004A99] underline hover:text-[#003366] flex items-center gap-1"
              >
                📞 +91 8649255551
              </a>
            </span>
          </li>
        </ol>
      </Card>
    </Section>
  );
};
