
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const SkillCard: React.FC<{ number: number, title: string, description: string }> = ({ number, title, description }) => (
    <div className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-md break-inside-avoid">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            <span className="flex-shrink-0 bg-yellow-400 text-gray-900 font-black w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3">{number}</span>
            {title}
        </h3>
        <P className="pl-12 text-sm">{description}</P>
    </div>
);

const KillModePlaybookPdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>Kill Mode Playbook</Title>
                <Subtitle>Your guide to controlling the conditions of the sale and becoming truly unbeatable.</Subtitle>
            </header>
            <main>
                <SectionTitle>The 9 Kill Skills 🔪</SectionTitle>
                <P>We don't beat other sales teams because we're mysterious. We beat them because we do the obvious and logical things nobody else does. This is your chance to put yourself on the winning team. These are your skills.</P>
                
                <div className="columns-2 gap-6 space-y-6 mt-6">
                    <SkillCard number={1} title="Breathe the Script" description="Not reading, not memorizing. Breathing. Knowing the words so well you can focus 100% on the prospect." />
                    <SkillCard number={2} title="Tone" description="How you say the words. Control your speed, volume, clarity, pitch, and pauses to make every word do its job." />
                    <SkillCard number={3} title="Introduction" description="The first 30-60 seconds. You must state your name, company, that the call is recorded, and the reason you're calling. No small talk." />
                    <SkillCard number={4} title="Discovery" description="The 9-step process to uncover a prospect's problems and map them to your solution. This is where you find the pain." />
                    <SkillCard number={5} title="Offer" description="The transition from discovery to closing. The 5 steps to making your offer so compelling they have to say yes." />
                    <SkillCard number={6} title="Objections" description="Understanding the 5 core reasons people don't buy: Time, Money, Decision-Maker, Preference, and Stalls." />
                    <SkillCard number={7} title="Looping" description="The technique to overcome objections by acknowledging, addressing, and asking for the sale again. Until you close." />
                    <SkillCard number={8} title="BAMFAM" description="Book A Meeting From A Meeting. The skill of ending a call that doesn't close by securing the next call." />
                    <SkillCard number={9} title="Referrals" description="The simplest, fastest way to get your next deal. Ask for them right after you close." />
                </div>

                <SectionTitle>Key Concepts</SectionTitle>
                <div className="p-6 bg-yellow-50 border-4 border-yellow-300 rounded-lg">
                    <h3 className="text-3xl font-bold text-yellow-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>Don't Be Cute.</h3>
                    <P>Basic methods get basic results. Complex methods get... no results. The basics are the basics for a reason. They work every time. In sales, it's breathing the script.</P>
                </div>

                <div className="mt-6 p-6 bg-blue-50 border-4 border-blue-300 rounded-lg">
                    <h3 className="text-3xl font-bold text-blue-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>Discovery = More Bad Stuff</h3>
                    <P>In discovery, your only job is to heighten their awareness of all the bad things that are happening (and good things that aren't) because of their problem.</P>
                </div>
                
                 <div className="mt-6 p-6 bg-green-50 border-4 border-green-300 rounded-lg">
                    <h3 className="text-3xl font-bold text-green-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>Offer = More Good Stuff</h3>
                    <P>In the offer, you show them how all the bad things go away and all the good things happen... if they buy.</P>
                </div>
            </main>
        </div>
    );
};

export default KillModePlaybookPdf;
