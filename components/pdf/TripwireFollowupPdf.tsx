
import React from 'react';
import { GeneratedDownsell, GeneratedOffer } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-4xl font-bold text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const DoodledBox: React.FC<{ children: React.ReactNode, title?: string, icon?: string }> = ({ children, title, icon = '💡' }) => (
    <div className="p-6 rounded-lg border-4 border-yellow-300 bg-yellow-50 my-6 break-inside-avoid shadow-lg">
        {title && <h3 className="text-2xl font-bold text-yellow-800 mb-2 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}><span className="text-3xl mr-3">{icon}</span>{title}</h3>}
        {children}
    </div>
);

const GapDiagram: React.FC<{ downsell: GeneratedDownsell, gso: GeneratedOffer }> = ({ downsell, gso }) => (
    <div className="my-8 p-6 bg-gray-100 rounded-lg text-center break-inside-avoid">
        <h3 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>From a Quick Fix to a Total Win</h3>
        <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-1/3 p-4 bg-blue-100 border border-blue-200 rounded-lg">
                <p className="font-bold text-blue-800">YOU ARE HERE 👍</p>
                <p className="text-sm text-blue-700 mt-1">{downsell.offer.name}</p>
            </div>
            <div className="text-5xl font-light text-gray-400 animate-pulse">→ → →</div>
            <div className="w-1/3 p-4 bg-green-100 border-2 border-green-400 rounded-lg shadow-lg">
                <p className="font-bold text-green-800">THIS IS THE GOAL 🏆</p>
                <p className="text-sm text-green-700 mt-1">{gso.promise}</p>
            </div>
        </div>
        <P className="mt-4">The <strong className="font-semibold">{gso.name}</strong> is the bridge that gets you there.</P>
    </div>
);

const GsoStackSection: React.FC<{ gso: GeneratedOffer }> = ({ gso }) => (
     <div className="break-inside-avoid">
        <SectionTitle>Here's the Full Treasure Map</SectionTitle>
        <div className="space-y-3 mt-4">
            {gso.stack.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-md">
                    <p className="font-bold text-gray-800 text-lg flex-grow pr-4">✅ {item.solution}</p>
                </div>
            ))}
        </div>
    </div>
);

const PriceAndGuaranteeSection: React.FC<{ gso: GeneratedOffer }> = ({ gso }) => (
    <div className="break-inside-avoid mt-10">
        <div className="mt-8 bg-white p-8 rounded-lg border-4 border-dashed border-gray-300 text-center shadow-2xl">
             <p className="text-lg font-semibold text-gray-600">Total Real Value:</p>
             <p className="text-4xl font-bold text-red-600 line-through">{gso.totalValue}</p>
             <p className="text-lg font-semibold text-gray-800 mt-8">Your Special Upgrade Price:</p>
             <p className="text-7xl font-black text-yellow-500 animate-pulse">{gso.price}</p>
        </div>
        <DoodledBox title="And It's Completely Risk-Free..." icon="🛡️">
            <p className="text-2xl text-center text-gray-700 italic leading-relaxed">"{gso.guarantee}"</p>
        </DoodledBox>
    </div>
);


interface TripwireFollowupPdfProps {
  downsell: GeneratedDownsell;
  gso: GeneratedOffer;
}

const TripwireFollowupPdf: React.FC<TripwireFollowupPdfProps> = ({ downsell, gso }) => {
  if (!downsell?.offer) {
    return <div className="p-8 bg-white font-sans pdf-container">Oops! We could not find the offer information.</div>;
  }
  
  return (
    <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
        <header className="text-center mb-10">
            <Title>Congrats! But Don't Stop Now...</Title>
            <Subtitle>You took the first step with the "{downsell.offer.name}". Here's the path to the finish line.</Subtitle>
        </header>

        <main>
            <P>First off, a huge congrats on taking action! You've already done what 99% of people only talk about.</P>
            <P>You now have a tool for a <strong className="font-semibold">quick win</strong>. But what if that was just the appetizer? What if it was the key to unlocking the whole amazing meal?</P>

            <GapDiagram downsell={downsell} gso={gso} />
            
            <SectionTitle>Introducing: The "{gso.name}"</SectionTitle>
            <P className="text-center text-lg italic mt-4">This is our complete, A-to-Z system for helping you achieve <strong className="font-semibold">"{gso.promise}"</strong>.</P>
            
            <GsoStackSection gso={gso} />
            <PriceAndGuaranteeSection gso={gso} />
            
             <div className="mt-12 text-center p-8 bg-green-500 text-white rounded-lg break-before-page">
                 <h3 className="text-5xl font-black" style={{ fontFamily: "'Patrick Hand', cursive" }}>Your Two Choices</h3>
                 <P className="text-lg mt-2 text-green-100">You can stay with your quick win, or you can take the proven roadmap to total success.</P>
                 <div className="mt-6 p-4 bg-white text-green-600 font-bold text-2xl rounded shadow-lg">
                    CLICK HERE TO UPGRADE NOW
                 </div>
            </div>
        </main>
    </div>
  );
};

export default TripwireFollowupPdf;
