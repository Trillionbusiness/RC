
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const Step: React.FC<{ number: string, title: string, children: React.ReactNode, icon: string, color: 'gray' | 'blue' | 'yellow' }> = ({ number, title, children, icon, color }) => {
    const colors = {
        gray: { bg: 'bg-gray-100', border: 'border-gray-300', text: 'text-gray-800' },
        blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' },
        yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800' }
    }
    const style = colors[color];
    return (
        <div className={`mt-8 p-6 ${style.bg} rounded-lg border-4 ${style.border} shadow-lg break-inside-avoid`}>
            <h3 className={`text-3xl font-bold ${style.text} flex items-center`} style={{ fontFamily: "'Patrick Hand', cursive" }}>
                <span className="flex-shrink-0 bg-white text-gray-900 font-black w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4 shadow-md">{icon}</span>
                <div>
                    <p className="text-sm font-semibold uppercase">Level {number}</p>
                    {title}
                </div>
            </h3>
            <div className="pl-20">
                {children}
            </div>
        </div>
    );
}

const MoneyModelsGuidePdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The Simple Guide to Getting Paid</Title>
                <Subtitle>(AKA: How to make a money machine that never runs out of gas)</Subtitle>
            </header>
            <main>
                <SectionTitle>The Big Idea 💡</SectionTitle>
                <P>Look, most businesses fail for one simple reason: they run out of money. They spend more to get a customer than that customer pays them. That's a dumb way to do business. We're going to do the opposite.</P>
                <P className="font-bold text-lg">The whole point of a "Money Model" is to get paid to acquire new customers. You spend $1 on ads, you make $2 back... immediately. Then you use that $2 to get two more customers. See? It's a money machine.</P>
                
                <SectionTitle>The Only Math You Need to Know 🧮</SectionTitle>
                <P>Forget spreadsheets. Just remember this one rule: for every dollar you spend to get a customer (your CAC), you should make at least three dollars back from them over their lifetime (their LTV).</P>
                <div className="text-center my-8 p-8 bg-green-100 border-4 border-green-300 rounded-lg">
                    <p className="text-5xl font-black text-green-700">LTV > 3 x CAC</p>
                    <p className="mt-2 text-gray-600">(What a customer is worth should be WAY bigger than what they cost to get)</p>
                </div>
                
                <SectionTitle>The 3 Levels of Making Money 🚀</SectionTitle>
                <P>Think of it like a video game. You're trying to level up your money-making skills.</P>
                
                <Step number="1" title="The 'At Least I'm Not Losing' Business" icon="😟" color="gray">
                    <P>This is where most businesses live. They make money from a customer... eventually. Maybe after a year. It's okay, but you can't grow fast this way.</P>
                </Step>
                
                <Step number="2" title="The 'Free Customers' Business" icon="🙂" color="blue">
                    <P>This is better. You make back the money you spent on ads within 30 days. Your customer acquisition is basically free! Now you can get as many customers as you want without going broke.</P>
                </Step>

                <Step number="3" title="The 'Money Machine' Business (This is YOU)" icon="😎" color="yellow">
                    <P>This is the cheat code. You spend $1 on ads and get $2 back in profit right away. Now you can outspend all your competitors and take over the world. This is our goal.</P>
                </Step>
            </main>
        </div>
    );
};

export default MoneyModelsGuidePdf;
