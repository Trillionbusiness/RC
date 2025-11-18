
import React from 'react';
import { BusinessData, GeneratedPlaybook } from '../../types';

// --- Reusable PDF Components ---
const Page: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-16 bg-[#FEFBF6] font-sans text-gray-800 break-after-page relative ${className}`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px', border: '8px solid #3A3A3A' }}>
        <div className="relative z-10">
            {children}
        </div>
        <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-bold">Trillion Business AI Blueprint</div>
    </div>
);
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ number: string, title: string, subtitle: string }> = ({ number, title, subtitle }) => (
    <header className="mb-8 break-after-avoid">
        <div className="flex items-center">
            <div className="flex-shrink-0 bg-gray-800 text-white font-black w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{number}</div>
            <div className="ml-6">
                <h2 className="text-5xl font-black text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h2>
                <p className="text-xl text-gray-500">{subtitle}</p>
            </div>
        </div>
    </header>
);
const FocusArea: React.FC<{ title: string, icon: string, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mt-6 p-6 bg-white rounded-lg border-2 border-gray-200 break-inside-avoid shadow-sm">
        <h3 className="text-2xl font-bold text-gray-700 mb-3 flex items-center" style={{ fontFamily: "'Patrick Hand', cursive" }}>
            <span className="text-3xl mr-3">{icon}</span>{title}
        </h3>
        <div className="space-y-2">{children}</div>
    </div>
);
const Goal: React.FC<{ type: 'Financial' | 'Activity' | 'System' | 'Learning' | 'Marketing' | 'Personal'; children: React.ReactNode }> = ({ type, children }) => {
    const styles = {
        Financial: { icon: '💰', color: 'text-green-700', bg: 'bg-green-50' },
        Activity: { icon: '🏃‍♂️', color: 'text-blue-700', bg: 'bg-blue-50' },
        System: { icon: '⚙️', color: 'text-purple-700', bg: 'bg-purple-50' },
        Learning: { icon: '🧠', color: 'text-yellow-700', bg: 'bg-yellow-50' },
        Marketing: { icon: '📢', color: 'text-pink-700', bg: 'bg-pink-50' },
        Personal: { icon: '🧘', color: 'text-indigo-700', bg: 'bg-indigo-50' },
    };
    const style = styles[type];

    return (
        <div className={`p-3 rounded-lg flex items-start ${style.bg}`}>
            <span className="text-2xl mr-3">{style.icon}</span>
            <div>
                <p className={`font-bold text-sm uppercase ${style.color}`}>{type} Goal</p>
                <p className="text-gray-800 font-semibold">{children}</p>
            </div>
        </div>
    );
};
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-base text-gray-700 leading-relaxed my-2">{children}</p>;
const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="my-4 p-4 border-l-4 border-gray-300 bg-gray-100 italic text-gray-600">"{children}"</div>;


// Helper to determine goals based on revenue
const getFinancialGoals = (monthlyRevenue: string) => {
    const revenue = parseInt(monthlyRevenue) || 0;
    if (revenue < 5000) {
        return {
            q1: "$10,000/mo",
            q2_3: "$25,000/mo",
            q4: "$40,000/mo",
            scalingTrigger: "$20,000/mo"
        };
    } else if (revenue < 50000) {
         return {
            q1: `$${(revenue * 1.5).toLocaleString()}/mo`,
            q2_3: `$${(revenue * 2.5).toLocaleString()}/mo`,
            q4: `$${(revenue * 3.5).toLocaleString()}/mo`,
            scalingTrigger: `$${(revenue * 2).toLocaleString()}/mo`
        };
    } else {
         return {
            q1: `$${(revenue * 1.2).toLocaleString()}/mo`,
            q2_3: `$${(revenue * 1.5).toLocaleString()}/mo`,
            q4: `$${(revenue * 2).toLocaleString()}/mo`,
            scalingTrigger: `$${(revenue * 1.4).toLocaleString()}/mo`
        };
    }
};

const OneYearBlueprintPdf: React.FC<{ businessData: BusinessData, playbook: GeneratedPlaybook }> = ({ businessData, playbook }) => {
    const goals = getFinancialGoals(businessData.monthlyRevenue);

    return (
      <>
        <Page className="flex flex-col justify-center items-start text-left">
             <p className="font-semibold text-gray-800 text-lg">Your One-Year Blueprint</p>
             <div className="flex-grow"></div>
             <h1 className="text-8xl font-black tracking-tight text-[#147273]" style={{ fontFamily: "'Patrick Hand', cursive" }}>FROM $1</h1>
             <h2 className="text-7xl font-black tracking-tight text-gray-900" style={{ fontFamily: "'Patrick Hand', cursive" }}>TO $1,000,000</h2>
             <p className="text-xl text-gray-600 mt-4">A Personalized Roadmap for: <strong className="font-bold">{businessData.businessType}</strong></p>
             <div className="flex-grow"></div>
             <div className="mt-12 pt-6">
                <p className="font-semibold text-gray-600">Generated by</p>
                <p className="font-bold text-2xl text-gray-900">Trillion Business AI</p>
             </div>
        </Page>
        <Page>
             <SectionTitle number="Q1" title="Months 1-3: The Foundation" subtitle="Master yourself and your offer. This is the concrete slab everything else is built on." />
             <FocusArea title="YOU Are The Asset" icon="👤">
                <P>Your business can only grow as much as you do. This quarter is about forging yourself into the person who can win.</P>
                <Goal type="Learning">Master the concept of a Grand Slam Offer. Read '$100M Offers' by Alex Hormozi.</Goal>
                <Goal type="Activity">Become competent at sales. Master the CLOSER framework and conduct your first 20 sales conversations using a script.</Goal>
                <Goal type="Personal">Execute a "Season of No." Eliminate 3 major time-wasting activities to create 8+ extra hours per week to work ON your business.</Goal>
             </FocusArea>
             <FocusArea title="Your Offer is The Weapon" icon="⚔️">
                 <P>Your offer must be so good, people feel stupid saying no. We will perfect it.</P>
                 <Quote>You will sell to <strong className="font-semibold">{businessData.targetClient}</strong> by solving their <strong className="font-semibold">{playbook.offer1.stack[0].problem}</strong> with your Grand Slam Offer: <strong className="font-semibold">"{playbook.offer1.name}"</strong>.</Quote>
                 <Goal type="System">Refine your Grand Slam Offer based on feedback from your first 20 sales calls. Does it truly solve their problem?</Goal>
             </FocusArea>
             <FocusArea title="Q1 Mission-Critical Goals" icon="🎯">
                <Goal type="Financial">Reach {goals.q1} in monthly recurring revenue.</Goal>
                <Goal type="Activity">Personally execute 100 warm or cold outreach messages to your ideal customer.</Goal>
             </FocusArea>
        </Page>
        <Page>
             <SectionTitle number="Q2-3" title="Months 4-9: The Machine" subtitle="Build a repeatable system for getting customers. This is your money machine." />
             <FocusArea title="Get Them To Buy (Lead Generation)" icon="📢">
                <P>Your only focus is mastering ONE lead generation method. Volume negates luck. Become a master of outreach.</P>
                <Quote>Your primary weapon is: <strong className="font-semibold">{playbook.marketingModel.steps[0].method}</strong>. Your mission is to use the provided template and make 20 attempts every single day.</Quote>
                <Goal type="Marketing">Generate 50 qualified leads per month using your primary weapon.</Goal>
             </FocusArea>
              <FocusArea title="Get Them To Buy MORE (LTV Maximization)" icon="📈">
                <P>Once you have a steady stream of customers, you can immediately increase your cashflow with a simple upsell.</P>
                <Goal type="Activity">On every sales call, after the close, offer one simple upsell. This could be more quantity, higher quality, or a cross-sell. (e.g., "Most people also add...")</Goal>
             </FocusArea>
              <FocusArea title="Q2 & Q3 Mission-Critical Goals" icon="🎯">
                <Goal type="Financial">Reach and maintain {goals.q2_3} in monthly revenue.</Goal>
                <div className="p-4 bg-red-100 border-2 border-dashed border-red-300 text-center">
                    <p className="font-bold text-red-800">🚨 SCALING TRIGGER 🚨</p>
                    <p className="text-red-700">Once you have hit <strong className="font-semibold">{goals.scalingTrigger}</strong> for two months in a row and feel overwhelmed, you have EARNED the right to hire.</p>
                </div>
             </FocusArea>
        </Page>
        <Page>
             <SectionTitle number="Q4" title="Months 10-12: The Fortress" subtitle="Solidify your success with leverage and learning systems. This makes your business last." />
             <FocusArea title="Get Help (Leverage)" icon="🤝">
                <P>You can't do it all. The most valuable skill is getting others to do stuff for you. It's time to buy back your time.</P>
                <Quote>Your first hire should be a <strong className="font-semibold">{playbook.operationsPlan.proposedRoles[0]?.roleTitle || 'Virtual Assistant'}</strong> to handle <strong className="font-semibold">{playbook.operationsPlan.proposedRoles[0]?.responsibilities[0] || 'administrative tasks'}</strong>.</Quote>
                <Goal type="System">Use the "Management Diamond": Document your key processes, Demonstrate them, and ensure your new hire can Duplicate the results.</Goal>
             </FocusArea>
             <FocusArea title="Get Better & Stick With It (Focus)" icon="🧠">
                <P>Don't get distracted by the "woman in the red dress." The new opportunity is a trap. The goal is to not interrupt compounding.</P>
                <Goal type="Learning">Implement a weekly learning loop. Analyze your top 10% and bottom 10% of customers/ads/content. What did the winners have in common? Do more of that.</Goal>
             </FocusArea>
             <FocusArea title="Q4 Mission-Critical Goals" icon="🎯">
                <Goal type="Financial">Stabilize at {goals.q4} in monthly revenue with your new hire integrated.</Goal>
                <Goal type="System">Successfully delegate 10 hours per week of your lowest-value tasks.</Goal>
             </FocusArea>
        </Page>
         <Page className="flex flex-col justify-center items-center text-center bg-gray-800 text-white">
            <h2 className="text-6xl font-black text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Game Never Ends.</h2>
            <p className="text-2xl mt-4">The goal isn't to hit a number. It's to become the person capable of hitting it.</p>
            <Quote>"The point of business is to stay in business. The point of marriage is to stay married. The games worth playing are infinite."</Quote>
            <p className="text-2xl mt-8">Keep playing.</p>
        </Page>
      </>
    );
};

export default OneYearBlueprintPdf;
