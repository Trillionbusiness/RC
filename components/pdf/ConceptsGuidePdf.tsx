
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const DoodledBox: React.FC<{ children: React.ReactNode, title: string, icon?: string }> = ({ children, title, icon = '💡' }) => (
    <div className="p-6 rounded-lg border-4 border-yellow-300 bg-yellow-50 my-6 break-inside-avoid shadow-lg">
        <h3 className="text-3xl font-bold text-yellow-800 mb-2 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}><span className="text-4xl mr-3">{icon}</span>{title}</h3>
        {children}
    </div>
);

const ValueEquationDiagram: React.FC = () => (
    <div className="p-6 bg-gray-100 rounded-lg my-6 text-center">
        <P className="font-bold text-xl">It's like a seesaw!</P>
        <div className="mt-4">
            <div className="p-4 bg-green-100 rounded-lg">
                <p className="font-bold text-2xl text-green-600">(🏆 Their Dream + ✅ Being SURE it'll work)</p>
            </div>
            <div className="w-full h-4 bg-gray-400 my-1 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-gray-400"></div>
            </div>
            <div className="p-4 bg-red-100 rounded-lg">
                <p className="font-bold text-2xl text-red-600">(⏰ How Long It Takes + 🥵 How Annoying It Is)</p>
            </div>
        </div>
        <P className="mt-4">Make the top part HUGE and the bottom part TINY.</P>
    </div>
);

const CfaDiagram: React.FC = () => (
    <div className="my-6 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Money Machine Flow</h3>
        <div className="flex items-center justify-around mt-4">
            <div className="text-center">
                <p className="text-4xl">💲</p>
                <p className="font-bold">You Spend $1</p>
            </div>
            <p className="text-4xl font-light text-gray-400">➡️</p>
            <div className="text-center">
                <p className="text-4xl">🙋</p>
                <p className="font-bold">Get a Customer</p>
            </div>
            <p className="text-4xl font-light text-gray-400">➡️</p>
             <div className="text-center">
                <p className="text-4xl">💰💰</p>
                <p className="font-bold">Get $2 Back</p>
            </div>
             <p className="text-4xl font-light text-gray-400">➡️</p>
             <div className="text-center">
                <p className="text-4xl">🔁</p>
                <p className="font-bold">Do It Again!</p>
            </div>
        </div>
    </div>
);


interface ConceptsGuidePdfProps {
  businessData: BusinessData;
  playbook: GeneratedPlaybook;
}

const ConceptsGuidePdf: React.FC<ConceptsGuidePdfProps> = ({ businessData, playbook }) => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The Secret Ideas In Your Plan</Title>
                <Subtitle>(Explained like you're 10 years old, because honestly, business should be this simple.)</Subtitle>
            </header>

            <main>
                <SectionTitle>Secret #1: The "Grand Slam Offer" 🍕</SectionTitle>
                <P>Imagine you're selling pizza. Most people sell one slice for $5. A Grand Slam Offer is like offering the WHOLE pizza, plus garlic bread, plus soda, plus free delivery... for $6. The customer would feel like a total dummy saying no.
                <br/><br/>
                Your plan gives you an offer so good, it's basically a pizza party for your customers.</P>
                <DoodledBox title="How to Make a Pizza Party Offer" icon="🤔">
                    <P>It's like a seesaw. You want the good stuff to be SUPER heavy, and the bad stuff to be light as a feather.</P>
                     <ValueEquationDiagram />
                </DoodledBox>

                <SectionTitle>Secret #2: The Money Machine 🤖</SectionTitle>
                <P>This is the secret to growing fast without running out of money. The goal is simple: get customers to pay you to get MORE customers.</P>
                 <DoodledBox title="The Golden Rule of Growth" icon="📜">
                    <P>The money you make from a new customer right away should be <strong className="font-semibold">at least double</strong> what it cost you to get them. This lets you build a self-funding "money machine."</P>
                </DoodledBox>
                <CfaDiagram />
                
                <SectionTitle>Secret #3: Find the Kink in the Hose 💧</SectionTitle>
                <P>A business is like a garden hose with kinks in it. You don't need to fix the whole hose; you just need to find the <strong className="font-semibold">biggest kink</strong> and straighten it. Then the water flows!</P>
                <DoodledBox title="What's Your Biggest Kink?" icon="🚧">
                    <P>Your plan finds which of these is your biggest problem right now so you can focus all your energy there.</P>
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">1. Not enough people to talk to.</strong> (Leads)</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">2. People aren't buying.</strong> (Sales)</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">3. Can't keep customers happy.</strong> (Delivery)</div>
                        <div className="p-3 bg-white rounded shadow"><strong className="font-semibold text-blue-700">4. Busy, but no money left over.</strong> (Profit)</div>
                    </div>
                </DoodledBox>
            </main>
        </div>
    );
};

export default ConceptsGuidePdf;
