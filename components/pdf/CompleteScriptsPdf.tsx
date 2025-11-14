
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-page pt-10" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-1 ${className || ''}`}>{children}</p>;

const Script: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-4 bg-gray-50 border-l-4 border-gray-300 my-2 font-mono text-sm break-inside-avoid">
        {children}
    </div>
);

const ScriptNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="italic text-gray-500 text-xs my-1">{children}</p>
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
                <Script>
                    <P>[NAME]?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>Yeah this is [REP] getting back to you from [COMPANY NAME] on a recorded line ... How've ya been?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>I saw that you had checked out [lead magnet] [today/this week/this month]? Is now a terrible time for a quick chat?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                </Script>

                <ScriptHeader>Discovery</ScriptHeader>
                <Script>
                    <P>great, so you're the owner at xyz...is that correct?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>got it got it...what...what had you kinda checking out... [LEAD MAGNET]?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>IF THEY SAY: "I like the content" or "I saw an ad"</P>
                    <P>[RECAP] I love to hear it... well I guess if you were to look at the business. Over the next quarter or two...what's the biggest focus point for you?</P>
                </Script>

                <SectionTitle>Outbound No Pick Up Text Script</SectionTitle>
                <ScriptHeader>WHEN TO USE: AFTER YOU DOUBLE DIAL AND THE PROSPECT DOESN'T PICKUP</ScriptHeader>
                <Script>
                    <P><strong>Message 1:</strong></P>
                    <P>Hey [prospect name]! It's [name] from [company name].</P>
                    <ScriptNote>(SEND)</ScriptNote>
                    <P>What had you download the [lead magnet]?</P>
                    <ScriptNote>(SEND)</ScriptNote>
                </Script>
                <Script>
                    <P><strong>Message 2:</strong></P>
                    <P>Great. I love that.</P>
                    <ScriptNote>(SEND)</ScriptNote>
                    <P>[founder] has more resources to help you scale faster. I have a few questions to see what would be best for you.</P>
                    <ScriptNote>(SEND)</ScriptNote>
                    <P>What is the biggest bottleneck to growth?</P>
                    <P>1) Marketing 2) Sales 3) People 4) Profit 5) Something crazy</P>
                </Script>

                <SectionTitle>ACQ Closing Script</SectionTitle>
                 <ScriptHeader>Intro</ScriptHeader>
                 <Script>
                    <P>[PROSPECT]! Hey it's [MY NAME] from [MY COMPANY] calling about [PRODUCT] on a recorded line—how's it going?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>Great. Doing great. Excited for our call today. We only have 20 min for our call today. Cool if we jump right in?</P>
                 </Script>
                 <ScriptHeader>Discovery</ScriptHeader>
                 <Script>
                    <P>Sweet! So first question—What had you book the call for [OUR PRODUCT]?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                    <P>Awesome. And what were your main takeaways?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                 </Script>
                 <ScriptHeader>Offer</ScriptHeader>
                 <Script>
                    <P>Got it. So it [CATEGORY]—and [CATEGORY]. That makes a ton of sense and luckily [PRODUCT] covers both! So...based on everything you told me...and given the fact that you've got [CATEGORY] and [CATEGORY] as your biggest constraints, I'd be happy to walk you through what we do. I'm excited for you! You want the details?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                 </Script>
                 <ScriptHeader>Close</ScriptHeader>
                 <Script>
                    <P>Cool. So. Last question for you—you ready to come out to Vegas?</P>
                    <ScriptNote>*Wait for response*</ScriptNote>
                 </Script>
            </main>
        </div>
    );
};

export default CompleteScriptsPdf;
