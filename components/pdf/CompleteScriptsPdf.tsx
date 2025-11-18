
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-page pt-10" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-1 ${className || ''}`}>{children}</p>;

const ScriptLine: React.FC<{ speaker: string, children: React.ReactNode, isNote?: boolean }> = ({ speaker, children, isNote = false }) => (
     <div className={`grid grid-cols-4 gap-4 my-2 ${isNote ? 'text-gray-500' : ''}`}>
        <div className="col-span-1 text-right font-bold pr-4">
            <p className={isNote ? 'italic' : ''}>{speaker}</p>
        </div>
        <div className="col-span-3">
             <p className={isNote ? 'italic' : 'font-semibold'}>{children}</p>
        </div>
    </div>
);


const ScriptHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-2xl font-bold text-gray-700 mt-6 mb-2" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h3>
);

const CompleteScriptsPdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The ACQ Script Bank</Title>
                <Subtitle>The exact words to say to get what you want. No thinking, just doing.</Subtitle>
                <div className="mt-4 p-4 bg-red-100 border-2 border-dashed border-red-300">
                    <p className="font-bold text-red-800">IMPORTANT: Do not change the scripts. Do not try to "make them your own." They work because they work. Breathe them until they are a part of you.</p>
                </div>
            </header>
            <main>
                <SectionTitle>Outbound Set Phone Script</SectionTitle>
                <ScriptHeader>Intro</ScriptHeader>
                <ScriptLine speaker="YOU:">[NAME]?</ScriptLine>
                <ScriptLine speaker="(NOTE)" isNote={true}>Wait for their response. Let them confirm it's them.</ScriptLine>
                <ScriptLine speaker="YOU:">Yeah this is [REP] getting back to you from [COMPANY NAME] on a recorded line ... How've ya been?</ScriptLine>
                <ScriptLine speaker="(NOTE)" isNote={true}>This tonality is key. You're casual, not a cold caller.</ScriptLine>
                <ScriptLine speaker="YOU:">I saw that you had checked out [lead magnet] [today/this week/this month]? Is now a terrible time for a quick chat?</ScriptLine>

                <ScriptHeader>Discovery</ScriptHeader>
                <ScriptLine speaker="YOU:">great, so you're the owner at xyz...is that correct?</ScriptLine>
                <ScriptLine speaker="YOU:">got it got it...what...what had you kinda checking out... [LEAD MAGNET]?</ScriptLine>
                <ScriptLine speaker="(NOTE)" isNote={true}>If they say "I like the content" or "I saw an ad", you reply:</ScriptLine>
                <ScriptLine speaker="YOU:">[RECAP] I love to hear it... well I guess if you were to look at the business. Over the next quarter or two...what's the biggest focus point for you?</ScriptLine>

                <SectionTitle>Outbound No Pick Up Text Script</SectionTitle>
                <ScriptHeader>WHEN TO USE: AFTER YOU DOUBLE DIAL AND THE PROSPECT DOESN'T PICKUP</ScriptHeader>
                 <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <p className="font-mono text-sm">
                        <strong>Message 1:</strong><br/>
                        Hey [prospect name]! It's [name] from [company name].<br/>
                        <em>(SEND)</em><br/>
                        What had you download the [lead magnet]?<br/>
                        <em>(SEND)</em>
                    </p>
                </div>
                 <div className="mt-4 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                     <p className="font-mono text-sm">
                        <strong>Message 2:</strong><br/>
                        Great. I love that.<br/>
                        <em>(SEND)</em><br/>
                        [founder] has more resources to help you scale faster. I have a few questions to see what would be best for you.<br/>
                        <em>(SEND)</em><br/>
                         What is the biggest bottleneck to growth?<br/>
                         1) Marketing 2) Sales 3) People 4) Profit 5) Something crazy
                    </p>
                </div>

                <SectionTitle>ACQ Closing Script</SectionTitle>
                 <ScriptHeader>Intro</ScriptHeader>
                <ScriptLine speaker="YOU:">[PROSPECT]! Hey it's [MY NAME] from [MY COMPANY] calling about [PRODUCT] on a recorded line—how's it going?</ScriptLine>
                 <ScriptLine speaker="YOU:">Great. Doing great. Excited for our call today. We only have 20 min for our call today. Cool if we jump right in?</ScriptLine>
                 
                 <ScriptHeader>Discovery</ScriptHeader>
                 <ScriptLine speaker="YOU:">Sweet! So first question—What had you book the call for [OUR PRODUCT]?</ScriptLine>
                 <ScriptLine speaker="(NOTE)" isNote={true}>Listen carefully. Their answer tells you what they think they need.</ScriptLine>
                 <ScriptLine speaker="YOU:">Awesome. And what were your main takeaways?</ScriptLine>
                
                 <ScriptHeader>Offer</ScriptHeader>
                 <ScriptLine speaker="YOU:">Got it. So it's [PROBLEM 1]—and [PROBLEM 2]. That makes a ton of sense and luckily [PRODUCT] covers both! So...based on everything you told me...and given the fact that you've got [PROBLEM 1] and [PROBLEM 2] as your biggest constraints, I'd be happy to walk you through what we do. I'm excited for you! You want the details?</ScriptLine>
                
                 <ScriptHeader>Close</ScriptHeader>
                <ScriptLine speaker="YOU:">Cool. So. Last question for you—you ready for this?</ScriptLine>
                <ScriptLine speaker="(NOTE)" isNote={true}>Silence. The first one to speak, loses.</ScriptLine>

            </main>
        </div>
    );
};

export default CompleteScriptsPdf;
