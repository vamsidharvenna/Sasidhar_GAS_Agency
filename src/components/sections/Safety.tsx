import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

const emergencyNumber = '+919642770955';

export const Safety: React.FC = () => {
  const { language } = useLanguage();

  const isTe = language === 'te';

  const heading = isTe ? 'భద్రత సమాచారం' : 'Safety First';
  const emergencyTitle = isTe ? 'అత్యవసరం: గ్యాస్ లీక్ / అగ్ని ప్రమాదం' : 'Emergency: Gas Leak / Fire';
  const emergencyDesc = isTe
    ? 'గ్యాస్ లీక్ అనుమానం ఉంటే, వెంటనే రెగ్యులేటర్‌ను ఆఫ్ చేసి సురక్షితమైన ప్రదేశానికి వెళ్లండి.'
    : 'If you suspect gas leakage, switch off the regulator immediately and move to a safe place.';
  const callText = isTe ? 'ఫైర్ స్టేషన్‌కు కాల్ చేయండి' : 'Call Fire Station';
  const tipsHeading = isTe ? 'ముఖ్యమైన భద్రతా సూచనలు:' : 'Key safety tips:';

  const tips = isTe
    ? [
        'సిలిండర్‌ను గాలి ప్రసరణ బాగా ఉన్న ప్రదేశంలో నిటారుగా ఉంచండి.',
        'వేడి, మంటలు మరియు నేరుగా ఎండ పడే ప్రదేశాల నుండి దూరంగా ఉంచండి.',
        'వంట పూర్తయ్యాక రెగ్యులేటర్‌ను తప్పనిసరిగా ఆఫ్ చేయండి.',
        'రబ్బర్ పైప్‌ను తరచుగా తనిఖీ చేసి, చీలికలు లేదా వదులుగా ఉంటే మార్చండి.',
        'గ్యాస్ వాసన వస్తే: అగ్గిపెట్టె వెలిగించకండి లేదా స్విచ్‌లు ఆన్ చేయకండి.',
        'గాలి ప్రసరణ కోసం వెంటనే తలుపులు మరియు కిటికీలు తెరవండి.',
        'వాసన కొనసాగితే వెంటనే సహాయం కోసం కాల్ చేయండి.',
      ]
    : [
        'Keep the cylinder upright in a well-ventilated place.',
        'Keep away from heat, flames, and direct sunlight.',
        'Switch OFF the regulator after cooking.',
        'Check rubber hose regularly; replace if cracked/loose.',
        'If you smell gas: do NOT light a match or operate switches.',
        'Open doors/windows immediately for ventilation.',
        'Call for help if the smell persists.',
      ];

  const footerLinks = isTe
    ? [
        { link: `tel:${emergencyNumber}`, text: '🚒 ఫైర్ స్టేషన్ అత్యవసర సేవలు' },
        {
          link: 'https://services.india.gov.in/service/detail/hp-gas--guidance-on-safety-for-lpg-consumers-1',
          text: '🔗 HPCL భద్రతా మార్గదర్శకాలు',
        },
        {
          link: 'https://www.hindustanpetroleum.com/documents/pdf/lpg.pdf',
          text: '📄 HPCL LPG భద్రతా PDF',
        },
      ]
    : [
        { link: `tel:${emergencyNumber}`, text: '🚒 Fire Station Emergency' },
        {
          link: 'https://services.india.gov.in/service/detail/hp-gas--guidance-on-safety-for-lpg-consumers-1',
          text: '🔗 HPCL Safety Guidelines',
        },
        {
          link: 'https://www.hindustanpetroleum.com/documents/pdf/lpg.pdf',
          text: '📄 HPCL LPG Safety PDF',
        },
      ];

  return (
    <Section
      id="safety"
      className="relative overflow-hidden bg-[#fff5f5] scroll-mt-[320px] pt-20"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_15%_15%,rgba(179,18,24,0.25),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(179,18,24,0.18),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(179,18,24,0.16),transparent_35%)]" />

      <div className="relative z-10 space-y-6 max-w-5xl mx-auto">
        <h2 className="text-center text-3xl text-[#b31218] mb-2 font-extrabold drop-shadow-sm">
          {heading}
        </h2>

        <Card
          borderLeft
          borderColorClass="border-l-[#b31218]"
          className="shadow-[0_18px_48px_rgba(0,0,0,0.18)] bg-white text-slate-900"
        >
          <div className="space-y-3">
            <p className="text-xl font-extrabold text-[#b31218] uppercase tracking-tight">
              {emergencyTitle}
            </p>
            <p className="text-base text-slate-800">{emergencyDesc}</p>
            <a href={`tel:${emergencyNumber}`} aria-label="Call fire station">
              <Button
                variant="secondary"
                fullWidth
                className="!bg-[#b31218] hover:!bg-[#9a0f14] text-white text-lg h-14 rounded-2xl shadow-[0_10px_28px_rgba(179,18,24,0.35)] flex items-center justify-center gap-3"
              >
                📞 {callText}
              </Button>
            </a>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
            <p className="text-base font-semibold text-[#b31218]">{tipsHeading}</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-800">
              {tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="mt-1 flex flex-col gap-2 bg-white/60 border border-white/0 rounded-xl p-3 text-[#b31218] font-semibold">
          {footerLinks.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
