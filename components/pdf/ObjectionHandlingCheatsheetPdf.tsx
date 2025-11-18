
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 pb-2 mb-4 mt-6 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-sm text-gray-700 leading-relaxed my-1 ${className || ''}`}>{children}</p>;
const Box: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <div className={`p-4 rounded-lg my-2 break-inside-avoid ${className}`}>{children}</div>;


const ObjectionCard: React.FC<{ title: string; objection: string; acknowledge: string; address: string; ask: string; }> = ({ title, objection, acknowledge, address, ask }) => (
    <Box className="bg-white border-2 border-gray-200 shadow-lg">
        <h4 className="font-bold text-lg text-gray-800">{title}</h4>
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg relative">
             <div className="absolute -left-2 top-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-red-50"></div>
            <p className="italic text-red-700">"{objection}"</p>
        </div>
        <div className="mt-3 space-y-2">
            <div className="flex items-start">
                <span className="flex-shrink-0 bg-yellow-400 text-gray-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                <div>
                    <p className="font-semibold text-sm">Acknowledge/Agree</p>
                    <p className="text-xs">{acknowledge}</p>
                </div>
            </div>
             <div className="flex items-start">
                <span className="flex-shrink-0 bg-blue-400 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                <div>
                    <p className="font-semibold text-sm">Address</p>
                    <p className="text-xs">{address}</p>
                </div>
            </div>
             <div className="flex items-start">
                <span className="flex-shrink-0 bg-green-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                <div>
                    <p className="font-semibold text-sm">Ask</p>
                    <p className="text-xs">{ask}</p>
                </div>
            </div>
        </div>
    </Box>
);

const ObjectionHandlingCheatsheetPdf: React.FC = () => {
    return (
        <div className="p-10 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-8">
                <Title>Objection Looping Cheatsheet</Title>
                <Subtitle>You are here to close them, not to argue with them.</Subtitle>
            </header>
            <main>
                <SectionTitle>The Golden Rule: Never Argue 🥋</SectionTitle>
                <P>The prospect's objection is just an excuse. Your job is not to prove them wrong, it's to help them get out of their own way. You do that by agreeing with them, reframing the problem, and asking for the sale again.</P>

                <SectionTitle>The 3-Step Loop Framework 🔄</SectionTitle>
                <div className="p-4 bg-gray-800 text-white rounded-lg text-center font-mono text-lg flex justify-around">
                    <span>1. Acknowledge</span>
                    <span className="font-bold text-yellow-400">➡️</span>
                    <span>2. Address</span>
                    <span className="font-bold text-yellow-400">➡️</span>
                    <span>3. Ask</span>
                </div>
                
                <SectionTitle>The 5 Big Objections: Battle Cards</SectionTitle>
                <div className="columns-2 gap-6 space-y-6">
                    <ObjectionCard 
                        title="1. Time"
                        objection="This isn't a good time."
                        acknowledge='"That makes sense. And..."'
                        address='"...if we structured this so it only took 30 minutes a day? Would that work for you?"'
                        ask=' "[They agree] Great, let\'s do this."'
                    />
                     <ObjectionCard 
                        title="2. Money"
                        objection="This is just too expensive."
                        acknowledge='"Super reasonable. And..."'
                        address='"...if talking to our team of experts saves you a year of trial and error, would it be worth it?"'
                        ask=' "[They agree] Perfect, let\'s get started then."'
                    />
                      <ObjectionCard 
                        title="3. Decision-Maker"
                        objection="I have to ask my wife."
                        acknowledge='"Makes sense. She\'s the boss around here. And..."'
                        address='"...what if we included her in the onboarding call so she\'s fully informed? Would that address her concerns?"'
                        ask=' "[They agree] Excellent, let\'s get you all set up."'
                    />
                      <ObjectionCard 
                        title="4. Preference"
                        objection="I don't like [specific thing]."
                        acknowledge='"I completely hear you. And..."'
                        address='"...what if we showed you how that [specific thing] is the exact reason our clients get [amazing result]? Would you be open to seeing why it works?"'
                        ask=' "[They agree] Awesome, let\'s get you going."'
                    />
                     <ObjectionCard 
                        title="5. Stall"
                        objection="I need to think about it."
                        acknowledge='"Smart point, it\'s a big decision. And..."'
                        address='"...that\'s probably the best reason for coming out—so we can help you get less busy... hows that sound?"'
                        ask=' "[They agree] I think that\'s the exact reason you should come. What do you think?"'
                    />
                </div>
            </main>
        </div>
    );
};

export default ObjectionHandlingCheatsheetPdf;
