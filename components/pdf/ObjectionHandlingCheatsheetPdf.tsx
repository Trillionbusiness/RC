
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-5xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-3xl font-bold text-gray-800 pb-2 mb-4 mt-6 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-sm text-gray-700 leading-relaxed my-1 ${className || ''}`}>{children}</p>;
const Box: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <div className={`p-4 rounded-lg my-2 break-inside-avoid ${className}`}>{children}</div>;


const ObjectionHandlingCheatsheetPdf: React.FC = () => {
    return (
        <div className="p-10 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-8">
                <Title>Objection Looping Cheatsheet</Title>
                <Subtitle>You are here to close them, not to argue with them.</Subtitle>
            </header>
            <main>
                <div className="columns-2 gap-8">
                    <Box className="bg-red-50 border-2 border-red-200">
                        <h3 className="font-bold text-lg text-red-700">❌ The Wrong Way</h3>
                        <P>Calling out their "bullshit." Trying to win the argument. Making them feel dumb.</P>
                        <P className="font-bold">Result: You might be right, but you'll be right and broke. You lose the sale.</P>
                    </Box>

                    <Box className="bg-green-50 border-2 border-green-200">
                        <h3 className="font-bold text-lg text-green-700">✅ The Right Way</h3>
                        <P>Looping. Acknowledge their objection, present a new perspective, and loop them back to the offer.</P>
                        <P className="font-bold">Result: You save them from their own excuses and give them the opportunity to buy.</P>
                    </Box>
                </div>

                <SectionTitle>The Objection Looping Framework 🔄</SectionTitle>
                <div className="p-4 bg-gray-800 text-white rounded-lg text-center font-mono text-lg">
                    <p>Verify Objection</p>
                    <p className="font-bold text-2xl">↓</p>
                    <p>Loop 1: Acknowledge → Address → Ask</p>
                    <p className="font-bold text-2xl">↓</p>
                    <p>Loop 2: Acknowledge → Address → Ask</p>
                     <p className="font-bold text-2xl">↓</p>
                    <p>... Until You Close.</p>
                </div>
                
                <SectionTitle>The 3 Steps of a Loop</SectionTitle>
                <ol className="list-decimal list-inside space-y-2 font-semibold">
                    <li><strong className="font-extrabold">Acknowledge/Agree:</strong> Find a nugget of truth in what they said and agree with it. This is disarming. Never use "but". Always use "and".</li>
                    <li><strong className="font-extrabold">Address:</strong> Offer a different perspective that addresses their concern and shows why it's actually a reason TO buy.</li>
                    <li><strong className="font-extrabold">Ask for the sale again:</strong> Immediately. This is the most important part. You must ask again to close.</li>
                </ol>
                
                <SectionTitle>Handling The 5 Big Objections</SectionTitle>
                <div className="space-y-4">
                    <Box className="bg-gray-100">
                        <h4 className="font-bold text-lg">1. Time: "This isn't a good time."</h4>
                        <P><strong>Acknowledge/Agree:</strong> "That makes sense. And..."</P>
                        <P><strong>Address:</strong> "...if we structured this so it only took 30 minutes a day? Would that work for you?"</P>
                        <P><strong>Ask:</strong> "[They agree] Great, let's do this."</P>
                    </Box>
                    <Box className="bg-gray-100">
                        <h4 className="font-bold text-lg">2. Money: "This is just too expensive."</h4>
                        <P><strong>Acknowledge/Agree:</strong> "Super reasonable. And..."</P>
                        <P><strong>Address:</strong> "...if talking to our team of experts saves you a year of trial and error, would it be worth it?"</P>
                        <P><strong>Ask:</strong> "[They agree] Perfect, let's get started then."</P>
                    </Box>
                     <Box className="bg-gray-100">
                        <h4 className="font-bold text-lg">3. Decision-Maker: "I have to ask my wife."</h4>
                        <P><strong>Acknowledge/Agree:</strong> "Makes sense. She's the boss around here. And..."</P>
                        <P><strong>Address:</strong> "...what if we included her in the onboarding call so she's fully informed? Would that address her concerns?"</P>
                        <P><strong>Ask:</strong> "[They agree] Excellent, let's get you all set up."</P>
                    </Box>
                     <Box className="bg-gray-100">
                        <h4 className="font-bold text-lg">4. Preference: "I don't like [specific thing]."</h4>
                        <P><strong>Acknowledge/Agree:</strong> "I completely hear you. And..."</P>
                        <P><strong>Address:</strong> "...what if we showed you how that [specific thing] is the exact reason our clients get [amazing result]? Would you be open to seeing why it works?"</P>
                        <P><strong>Ask:</strong> "[They agree] Awesome, let's get you going."</P>
                    </Box>
                     <Box className="bg-gray-100">
                        <h4 className="font-bold text-lg">5. Stall: "I need to think about it."</h4>
                        <P><strong>Acknowledge/Agree:</strong> "Smart point, it's a big decision. And..."</P>
                        <P><strong>Address:</strong> "...that's probably the best reason for coming out—so we can help you get less busy... hows that sound?"</P>
                        <P><strong>Ask:</strong> "[They agree] I think that's the exact reason you should come. What do you think?"</P>
                    </Box>
                </div>
            </main>
        </div>
    );
};

export default ObjectionHandlingCheatsheetPdf;
