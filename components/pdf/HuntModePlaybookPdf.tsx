
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const Step: React.FC<{ number: number, title: string, children: React.ReactNode, icon: string }> = ({ number, title, children, icon }) => (
    <div className="mt-6 p-6 bg-white rounded-lg border-2 border-gray-200 shadow-lg break-inside-avoid">
        <h3 className="text-3xl font-bold text-gray-800 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            <span className="flex-shrink-0 bg-yellow-400 text-gray-900 font-black w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4 shadow-lg">{icon}</span>
            {title}
        </h3>
        <div className="pl-20">
            {children}
        </div>
    </div>
);

const HuntModePlaybookPdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>🏹 Hunt Mode Playbook</Title>
                <Subtitle>Your daily guide to finding and scheduling as many sales calls as possible.</Subtitle>
            </header>
            <main>
                <SectionTitle>The Two Modes: Hunt vs. Kill</SectionTitle>
                <P>A closer is always doing one of two things: hunting or killing.</P>
                <div className="grid grid-cols-2 gap-8 mt-4">
                    <div className="p-6 bg-blue-50 border-l-8 border-blue-400 rounded-r-lg">
                        <h3 className="text-2xl font-bold text-blue-800">🏹 Hunt Mode</h3>
                        <P className="text-sm">Everything you do to get prospects on the phone. This is where you sharpen your tools, lay your snares, and track your targets. Hunting maximizes <strong className="font-semibold">opportunities</strong>.</P>
                    </div>
                    <div className="p-6 bg-red-50 border-l-8 border-red-400 rounded-r-lg">
                        <h3 className="text-2xl font-bold text-red-800">🔪 Kill Mode</h3>
                        <P className="text-sm">Everything you do while on the phone to get the sale. This is where you bring the pain, make your offer, and loop any objections. Killing maximizes <strong className="font-semibold">conversion</strong>.</P>
                    </div>
                </div>
                <P className="text-center font-bold mt-4">You can't kill what you don't hunt. Let's hunt.</P>

                <SectionTitle>The 4 Daily Hunting Activities</SectionTitle>
                <P>This is what you do, every hour of the day, to line up as many kills as possible.</P>

                <Step number={1} title="Pre-Flight Checklist" icon="📝">
                    <P>Preparation increases conversion. Know your prospect, what offer is best for them, and what objections they might have <strong className="font-semibold">ahead of time</strong>. Review your notes the night before and the morning of your calls.</P>
                </Step>
                
                <Step number={2} title="Work Your List" icon="📞">
                    <P>If you're not on a close call, you're getting prospects on close calls. This is the game. Work your list in this order of priority:</P>
                    <ul className="list-decimal list-inside space-y-2 mt-2 font-semibold">
                        <li><strong>Priority 1: Inbound Sets.</strong> Newest, freshest, highest value. If you get an inbound notification, call them immediately.</li>
                        <li><strong>Priority 2: BAMFAMs.</strong> "Booked A Meeting From A Meeting." They've spoken to you before. Keep them engaged so they show up.</li>
                        <li><strong>Priority 3: Pipeline.</strong> Anyone who no-showed, declined, or you still have permission to call. Work them from newest to oldest.</li>
                    </ul>
                </Step>

                <Step number={3} title="Generate Your Own Luck" icon="✨">
                    <P>This is how you create your own opportunities. Drop everything (except a live call) during "Pickup Primetime" - the hours your leads are most likely to answer.</P>
                     <ul className="list-decimal list-inside space-y-2 mt-2 font-semibold">
                        <li><strong>Priority 1: Getting Referrals.</strong> Ask happy customers for intros. This is the best source of leads.</li>
                        <li><strong>Priority 2: Opt-Ins.</strong> People who downloaded a lead magnet. Call them from newest to oldest.</li>
                    </ul>
                </Step>

                <Step number={4} title="End of Day Debrief" icon="✅">
                    <P>You win tomorrow <strong className="font-semibold">today</strong>. Finish your day by closing up shop properly.</P>
                    <ul className="list-disc list-inside space-y-1 mt-2 font-semibold text-sm">
                        <li>Record Call Outcomes in the CRM.</li>
                        <li>Update Call Notes with new info.</li>
                        <li>Update Opt-Outs for anyone who said "don't contact me."</li>
                        <li>Submit Your Worst Call For Review.</li>
                        <li>Inbox Zero across all channels.</li>
                    </ul>
                </Step>
            </main>
        </div>
    );
};

export default HuntModePlaybookPdf;
