import React from 'react';

// --- Reusable PDF Components ---
const Page: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => (
    <div className={`p-16 bg-[#FEFBF6] font-sans text-gray-800 break-after-page relative ${className}`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px', border: '8px solid #3A3A3A' }}>
        <div className="relative z-10">
            {children}
        </div>
        <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-bold">Trillion Business AI</div>
    </div>
);
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ icon: string, title: string, subtitle: string }> = ({ icon, title, subtitle }) => (
    <header className="mb-8 break-after-avoid">
        <div className="flex items-center">
            <div className="flex-shrink-0 bg-gray-800 text-white font-black w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{icon}</div>
            <div className="ml-6">
                <h2 className="text-5xl font-black text-gray-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h2>
                <p className="text-xl text-gray-500">{subtitle}</p>
            </div>
        </div>
    </header>
);
const FocusBox: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <div className={`mt-6 p-6 rounded-lg border-2 border-dashed break-inside-avoid shadow-sm ${className}`}>
        <h3 className="text-2xl font-bold text-gray-700 mb-3" style={{ fontFamily: "'Patrick Hand', cursive" }}>{title}</h3>
        {children}
    </div>
);
const P: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-2 ${className || ''}`}>{children}</p>;
const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="my-4 p-4 border-l-4 border-gray-300 bg-gray-100 italic text-gray-600">"{children}"</div>;
const Strong: React.FC<{children: React.ReactNode}> = ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>

const BlueprintToOneMillionPdf: React.FC<{}> = () => {
    return (
      <>
        <Page className="flex flex-col justify-center items-start text-left">
             <p className="font-semibold text-gray-800 text-lg">The Blueprint To</p>
             <div className="flex-grow"></div>
             <h1 className="text-8xl font-black tracking-tight text-[#147273]" style={{ fontFamily: "'Patrick Hand', cursive" }}>BECOMING</h1>
             <h2 className="text-7xl font-black tracking-tight text-gray-900" style={{ fontFamily: "'Patrick Hand', cursive" }}>A MILLIONAIRE</h2>
             <p className="text-xl text-gray-600 mt-4">The fundamentals of wealth creation, getting your first million, and building an empire that lasts.</p>
             <div className="flex-grow"></div>
             <div className="mt-12 pt-6">
                <p className="font-semibold text-gray-600">Based on the teachings of</p>
                <p className="font-bold text-2xl text-gray-900">Alex Hormozi</p>
             </div>
        </Page>
        <Page>
             <SectionTitle icon="1" title="The Foundation" subtitle="Fundamentals of Wealth Creation" />
             <FocusBox title="Own, Don't Earn" className="border-green-300 bg-green-50">
                <P>You can earn your way to a million over 10 years, saving every penny. Or you can <Strong>own an asset</Strong> that gets you there much faster. An automated business that makes $250k/year in profit could be worth $1M today.</P>
                <Quote>The faster way is to own your way there.</Quote>
            </FocusBox>
            <FocusBox title="The Power of One: Don't Diversify" className="border-blue-300 bg-blue-50">
                <P>Diversification is for preserving wealth, not creating it. Go all in on <Strong>one thing</Strong>. Fill one cup until it overflows, then you can fill others. Your 10% attention can't compete against someone's 100%.</P>
                <Quote>It's not which one will work, it's which one will you work on.</Quote>
            </FocusBox>
        </Page>
        <Page>
             <SectionTitle icon="🧱" title="Foundation Pt. 2: The Long Game" subtitle="Build it right, or don't build it at all." />
             <P>If I told you to build the tallest tower in 10 seconds, you'd stack boxes vertically. They'd fall over. If I gave you 10 days, you'd build a strong foundation first.</P>
             <P><Strong>Your business is that tower.</Strong> Rushing for quick sales without a solid product is like building a flimsy tower. It will get stuck and fall.</P>
             <FocusBox title="The Virtuous Cycle" className="border-purple-300 bg-purple-50">
                <ol className="list-decimal list-inside space-y-2 font-semibold">
                    <li>Build an amazing, valuable thing. Make it a work of art.</li>
                    <li>Let people know about it (marketing & sales).</li>
                    <li>Get feedback and go back to step 1. <Strong>Make the thing even better.</Strong></li>
                    <li>Repeat. Forever.</li>
                </ol>
                <P className="mt-2">Don't just crank marketing. Crank the quality of your product. A great product markets itself through happy customers. That's a foundation you can build a skyscraper on.</P>
            </FocusBox>
        </Page>
        <Page>
            <SectionTitle icon="2" title="The Machine" subtitle="Tactics For Your First Million" />
            <FocusBox title="Find a Hungry Crowd" className="border-yellow-300 bg-yellow-50">
                <P>It's better to have a mediocre hot dog stand in front of a starving crowd than the world's best hot dog stand in a desert. <Strong>The market you choose is the biggest factor in your success.</Strong></P>
                 <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                    <li><Strong>Pain:</Strong> They must have a desperate need, not just a want.</li>
                    <li><Strong>Purchasing Power:</Strong> They must have the ability to buy.</li>
                    <li><Strong>Easy to Target:</Strong> You must be able to find them easily.</li>
                    <li><Strong>Growing:</Strong> The market should be getting bigger, not smaller.</li>
                </ul>
            </FocusBox>
            <FocusBox title="The Value Equation" className="border-red-300 bg-red-50">
                <P>Value isn't just about what they get. It's an equation. Maximize the top, minimize the bottom.</P>
                <div className="text-center my-2 p-2 bg-white rounded-md">
                    <div className="p-2 bg-green-100 rounded text-green-800 font-bold">(Dream Outcome) x (Perceived Likelihood of Achievement)</div>
                    <div className="w-full h-1 bg-gray-400 my-1"></div>
                    <div className="p-2 bg-red-100 rounded text-red-800 font-bold">(Time Delay) x (Effort & Sacrifice)</div>
                </div>
                <P>Your offer is the single biggest lever you have. A great offer makes sales easy. A bad offer makes sales impossible.</P>
            </FocusBox>
        </Page>
         <Page>
            <SectionTitle icon="3" title="Scale & Sustain" subtitle="Get Rich and Stay Rich" />
            <FocusBox title="People: The Path to Enterprise Value" className="border-indigo-300 bg-indigo-50">
                <P>A "genius with a thousand hands" makes income. A business that runs without the genius has <Strong>enterprise value</Strong>. You can't sell yourself, but you can sell a system run by great people.</P>
                <P>You must market to four groups, not just one:</P>
                 <ul className="list-disc list-inside space-y-1 mt-2 font-semibold">
                    <li><Strong>Prospects</Strong> to become Customers.</li>
                    <li><Strong>Customers</Strong> to become Repeat Customers.</li>
                    <li><Strong>Candidates</Strong> to become Employees.</li>
                    <li><Strong>Employees</Strong> to become Leaders.</li>
                </ul>
            </FocusBox>
            <FocusBox title="Reputation & Compounding" className="border-pink-300 bg-pink-50">
                <P>Your reputation is the Goodwill you build by providing more value than you take. Goodwill compounds faster than revenue. Protect it at all costs.</P>
                <Quote>The money isn't made in the buy or the sell. It's made in the wait.</Quote>
                <P>Compounding only works if you don't interrupt it. Stick with your one thing. The boring path is what makes you rich.</P>
            </FocusBox>
        </Page>
        <Page className="flex flex-col justify-center items-center text-center bg-gray-800 text-white">
            <h2 className="text-6xl font-black text-white" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Final Level: Enjoy The Game</h2>
            <p className="text-2xl mt-4">Work doesn't stop. It just becomes the work you choose. The goal isn't to stop playing; it's to play a game you love.</p>
            <Quote>"The best games in life are infinite games... The point isn't to get married, the point is to stay married. The point isn't to win at business, the point is to stay in business."</Quote>
            <p className="text-2xl mt-8">Keep playing. You win as long as you never quit.</p>
        </Page>
      </>
    );
};

export default BlueprintToOneMillionPdf;
