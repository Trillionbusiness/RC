
import React from 'react';
import { GeneratedAdPlaybook, AdFramework } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 pl-2">
        {items.map((item, i) => <li key={i} className="text-base text-gray-700">{item}</li>)}
    </ul>
);

const FrameworkCard: React.FC<{ framework: AdFramework }> = ({ framework }) => (
    <div className="p-8 bg-white rounded-lg border-4 border-gray-200 shadow-lg break-before-page pt-10">
        <h3 className="text-5xl font-black text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>{framework.frameworkName}</h3>
        
        <div className="mt-6 p-4 bg-yellow-50 border-l-8 border-yellow-400 rounded-r-lg">
            <h4 className="font-bold text-lg text-yellow-800">🤔 Why This Will Work For You:</h4>
            <P className="text-sm">{framework.whyItWorks}</P>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-lg text-blue-800">👀 Visual Hook (First 3 Seconds)</h4>
                <UL items={framework.visualHook} />
            </div>
             <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-bold text-lg text-green-800">📝 How To Make This Ad</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                    {framework.howToApply.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
            </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
            <h4 className="font-bold text-lg text-yellow-400">🎬 Your Ad Script (Copy & Paste)</h4>
            <div className="mt-2 p-4 bg-gray-900 rounded font-mono text-sm whitespace-pre-wrap">
                <p><strong className="text-red-400">[HOOK]:</strong> {framework.adCopy.hook}</p>
                <br />
                <p><strong className="text-green-400">[BODY / OFFER]:</strong> {framework.adCopy.meatOrOffer}</p>
            </div>
        </div>
    </div>
);

interface AdFrameworksGuidePdfProps {
  adPlaybook: GeneratedAdPlaybook;
}

const AdFrameworksGuidePdf: React.FC<AdFrameworksGuidePdfProps> = ({ adPlaybook }) => {
  return (
    <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
      <header className="text-center mb-12">
        <Title>{adPlaybook.title}</Title>
        <Subtitle>Your custom-built advertising frameworks, ready to deploy.</Subtitle>
      </header>
      <main>
        <div className="text-center p-6 bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 break-inside-avoid my-6">
            <h3 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Big Idea</h3>
            <P className="italic text-lg">"{adPlaybook.corePrinciple}"</P>
        </div>

        {adPlaybook.frameworks.map((framework, index) => (
            <FrameworkCard key={index} framework={framework} />
        ))}
      </main>
    </div>
  );
};

export default AdFrameworksGuidePdf;
