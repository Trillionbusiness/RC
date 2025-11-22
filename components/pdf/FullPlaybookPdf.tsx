
import React from 'react';
import {
    GeneratedPlaybook,
    GeneratedDiagnosis,
    BusinessData,
} from '../../types';

// Import all the PDF components
import OneYearBlueprintPdf from './OneYearBlueprintPdf';
import ConceptsGuidePdf from './ConceptsGuidePdf';
import KpiDashboardPdf from './KpiDashboardPdf';
import OfferPresentationPdf from './OfferPresentationPdf';
import MoneyModelsGuidePdf from './MoneyModelsGuidePdf';
import CfaModelPdf from './CfaModelPdf';
import LandingPagePdf from './LandingPagePdf';
import DownsellPamphletPdf from './DownsellPamphletPdf';
import TripwireFollowupPdf from './TripwireFollowupPdf';
import AdFrameworksGuidePdf from './AdFrameworksGuidePdf';
import AdKaleidoscopeGuidePdf from './AdKaleidoscopeGuidePdf';
import ProofChecklistPdf from './ProofChecklistPdf';
import SalesMindsetGuidePdf from './SalesMindsetGuidePdf';
import HuntModePlaybookPdf from './HuntModePlaybookPdf';
import KillModePlaybookPdf from './KillModePlaybookPdf';
import ObjectionHandlingCheatsheetPdf from './ObjectionHandlingCheatsheetPdf';
import CompleteScriptsPdf from './CompleteScriptsPdf';
import ValueStackAssetsPdf from './ValueStackAssetsPdf';
import MentalToughnessPdf from './MentalToughnessPdf';

// --- Reusable PDF Components ---
const Page: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-16 bg-[#FEFBF6] font-sans text-gray-800 break-after-page relative ${className}`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px', border: '8px solid #3A3A3A' }}>
        <div className="relative z-10">
            {children}
        </div>
        <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-bold">Trillion Business AI</div>
    </div>
);

const SectionTitlePage: React.FC<{ number: number; title: string; subtitle: string }> = ({ number, title, subtitle }) => (
    <Page className="flex flex-col justify-center items-center text-center">
        <div className="w-28 h-28 bg-[#FFC700] rounded-full flex items-center justify-center text-6xl font-black text-gray-900 shadow-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{number}</div>
        <h1 className="text-6xl font-black tracking-tighter text-gray-900 mt-8" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h1>
        <p className="text-2xl text-gray-600 mt-4 max-w-2xl">{subtitle}</p>
        <p className="mt-8 text-4xl">👇</p>
    </Page>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10 break-inside-avoid">
        <h2 className="text-5xl font-black text-[#147273] pb-3 mb-6" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode; className?: string, icon?: string }> = ({ title, children, className, icon = '🔹' }) => (
    <div className={`mt-6 p-6 bg-white rounded-lg border-2 border-gray-200 break-inside-avoid shadow-sm ${className || ''}`}>
        <h3 className="text-2xl font-bold text-gray-700 mb-2 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            <span className="text-lg mr-2">{icon}</span>{title}
        </h3>
        {children}
    </div>
);

const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={`text-base text-gray-700 leading-relaxed ${className || ''}`}>{children}</p>
);

const OL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ol className="list-decimal list-inside space-y-2 pl-2">
        {items.map((item, i) => <li key={i} className="text-base text-gray-700">{item}</li>)}
    </ol>
);

const DiagnosisSection: React.FC<{ diagnosis: GeneratedDiagnosis }> = ({ diagnosis }) => (
    <Section title="Your Diagnosis (The GPS)">
        <P>To get where you're going, you need to know where you are. Think of this as your business's check-up. No sugarcoating, just the simple truth so we can get you growing.</P>
        <div className="grid grid-cols-2 gap-6">
            <SubSection title="Your Current Stage" icon="📍">
                <P className="font-bold text-2xl text-[#147273]">{diagnosis.currentStage}</P>
            </SubSection>
            <SubSection title="Your Main Job Right Now" icon="👨‍🚀">
                <P className="font-bold text-2xl text-gray-800">{diagnosis.yourRole}</P>
            </SubSection>
        </div>
        <SubSection title="What's Holding You Back (The Baddies)" icon="🚧">
             <P>These are the only things you need to worry about. Fixing these is how you win.</P>
             <OL items={diagnosis.constraints.map(c => <span className="font-semibold text-red-700">"{c}"</span>)} />
        </SubSection>
        <SubSection title="Your Simple Action Plan (The Treasure Map)" icon="🗺️">
             <P>This is it. Your simple, focused plan. Ignore everything else and just do these things. That's how you get rich.</P>
            <OL items={diagnosis.actions.map(a => <span className="font-semibold text-green-700">{a}</span>)} />
        </SubSection>
    </Section>
);

// --- MAIN COMPONENT ---
interface FullPlaybookPdfProps {
    playbook: GeneratedPlaybook;
    businessData: BusinessData;
}

const FullPlaybookPdf: React.FC<FullPlaybookPdfProps> = ({ playbook, businessData }) => {
  return (
    <>
        {/* COVER PAGE */}
        <Page className="flex flex-col justify-center items-start text-left">
             <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-xl font-bold text-white mb-4" style={{ fontFamily: "'Patrick Hand', cursive" }}>YOUR LOGO</div>
             <p className="font-semibold text-gray-800 text-lg">Trillion Business AI</p>
             <div className="flex-grow"></div>
             <h1 className="text-8xl font-black tracking-tight text-[#147273]" style={{ fontFamily: "'Patrick Hand', cursive" }}>THE COMPLETE</h1>
             <h2 className="text-7xl font-black tracking-tight text-gray-900" style={{ fontFamily: "'Patrick Hand', cursive" }}>BUSINESS PLAYBOOK</h2>
             <div className="flex-grow"></div>
             <div className="mt-12 pt-6">
                <p className="font-semibold text-gray-600">Made with ❤️ for {businessData.businessType}</p>
                <p className="font-bold text-2xl text-gray-900">Trillion Business AI</p>
             </div>
        </Page>
        
        {/* PART 1: STRATEGY & MINDSET */}
        <SectionTitlePage number={1} title="Strategy & Mindset" subtitle="The concepts and blueprint for your success." />
        <ConceptsGuidePdf playbook={playbook} businessData={businessData} />
        <OneYearBlueprintPdf playbook={playbook} businessData={businessData} />

        {/* PART 2: DIAGNOSIS & ROADMAP */}
        <SectionTitlePage number={2} title="Diagnosis & Roadmap" subtitle="Your current location and the path to your destination." />
        <Page><DiagnosisSection diagnosis={playbook.diagnosis} /></Page>
        <MentalToughnessPdf analysis={playbook.mentalToughnessAnalysis} />
        <KpiDashboardPdf kpiDashboard={playbook.kpiDashboard} />

        {/* PART 3: YOUR IRRESISTIBLE OFFERS */}
        <SectionTitlePage number={3} title="Your Irresistible Offers" subtitle="The foundation of your business: deals so good people feel stupid saying no." />
        <OfferPresentationPdf playbook={playbook} />

        {/* PART 4: THE MONEY MODEL */}
        <SectionTitlePage number={4} title="The Money Model" subtitle="The economic engine that funds your growth." />
        <MoneyModelsGuidePdf />
        <CfaModelPdf moneyModel={playbook.moneyModel} />

        {/* PART 5: MARKETING & SALES ENGINE */}
        <SectionTitlePage number={5} title="Marketing & Sales Engine" subtitle="Your machine for finding customers and closing deals." />
        <LandingPagePdf playbook={playbook} businessData={businessData} />
        <DownsellPamphletPdf downsell={playbook.downsell} />
        <TripwireFollowupPdf downsell={playbook.downsell} gso={playbook.offer1} />
        {playbook.adPlaybook && <AdFrameworksGuidePdf adPlaybook={playbook.adPlaybook} />}
        <AdKaleidoscopeGuidePdf />
        <ProofChecklistPdf />
        <SalesMindsetGuidePdf />
        <HuntModePlaybookPdf />
        <KillModePlaybookPdf />
        <ObjectionHandlingCheatsheetPdf />
        <CompleteScriptsPdf />

        {/* PART 6: YOUR ASSET LIBRARY */}
        <SectionTitlePage number={6} title="Your Asset Library" subtitle="All the copy-paste templates, guides, and scripts for your offers." />
        <ValueStackAssetsPdf offer={playbook.offer1} />
        <ValueStackAssetsPdf offer={playbook.offer2} />
        <ValueStackAssetsPdf offer={playbook.downsell.offer} />
        
        {/* CONCLUDING PAGE */}
        <Page className="flex flex-col justify-center items-center text-center bg-[#147273] text-white">
            <h2 className="text-6xl font-black text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Plan Works If You Do.</h2>
            <p className="text-2xl mt-4">You have the map. Time to take the first step.</p>
        </Page>
    </>
  );
};

export default FullPlaybookPdf;
