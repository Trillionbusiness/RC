
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-lg text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const Quote: React.FC<{ children: React.ReactNode; author: string }> = ({ children, author }) => (
    <div className="my-6 p-6 border-l-8 border-yellow-400 bg-yellow-50 break-inside-avoid">
        <p className="text-3xl italic text-gray-800 leading-snug">"{children}"</p>
        <p className="text-right font-bold text-gray-600 mt-2">- {author}</p>
    </div>
);

const SalesMindsetGuidePdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The ACQ Sales Mindset</Title>
                <Subtitle>How to Win Before You Even Pick Up The Phone.</Subtitle>
            </header>
            <main>
                <SectionTitle>Welcome to the Jungle  jungle</SectionTitle>
                <P>This handbook has one purpose: <strong className="font-semibold">To shortcut your success.</strong></P>
                <P>By the time you finish it, you will know what winning <strong className="font-semibold">really</strong> means. And more than that, how to <strong className="font-semibold">do it</strong>.</P>
                <Quote author="Alex Hormozi">Volume negates luck.</Quote>
                
                <SectionTitle>What is Selling? 🐎</SectionTitle>
                <P>If you execute everything in this handbook, you will become an expert at selling. But you cannot get there without first understanding what selling <strong className="font-semibold">is</strong>.</P>
                <P>A story: An arrogant student tells his professor, "You can lead a horse to water, but you can't make it drink." The professor replies, "You assume the environment doesn't matter. You are wrong." He then lists ways to make the horse drink: salt its feed, remove its water for a while, put water an inch from its mouth...</P>
                <P>The point is, the situation makes the horse drink, not a conversation with the horse.</P>
                <div className="p-6 bg-gray-800 text-white rounded-lg my-6 text-center shadow-lg">
                    <p className="text-2xl font-bold">First, selling means <strong className="text-yellow-400">maximizing the likelihood</strong> a prospect buys.</p>
                    <p className="text-2xl font-bold mt-2">Second, a sales process <strong className="text-yellow-400">arranges conditions</strong> to maximize that likelihood.</p>
                </div>
                <P>If you control the conditions, you control the outcome. That's the game. That's how you win.</P>

                <SectionTitle>What Being The Top .01% Looks Like 🏆</SectionTitle>
                <P>Many people say they want to be in the top 1%, or .1%, or even .01%. But that saying has zero bearing on whether they get there. <strong className="font-semibold">Achievement comes from actions, not aspirations.</strong></P>
                <ul className="list-none space-y-2 my-4">
                    <li>To be the top 1%, you need to enter a room of 100 people and leave #1.</li>
                    <li>To be the top .1%, you need to enter a room of 1,000 and leave #1.</li>
                    <li>To be the top .01%, you need to enter a room of 10,000 and leave #1.</li>
                </ul>
                <P>That's a stadium. In a battle to the death in a stadium, you have to come out on top. You beat <strong className="font-semibold">everyone</strong>. Not almost everyone.</P>
                <Quote author="LH Hardwick">A man with an experience is never at the mercy of a man with an opinion.</Quote>
                <P>Outwork everyone because volume negates luck. Prepare so much it's <strong className="font-semibold">unreasonable to fail</strong>. In sales, violence is the answer—violent preparation, violent persistence, violent commitment.</P>
                <div className="mt-8 text-center p-8 bg-yellow-400 text-gray-900 rounded-lg">
                    <h3 className="text-4xl font-black" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Secret to Success:</h3>
                    <p className="text-2xl mt-2 font-semibold">1. Get Better.</p>
                    <p className="text-2xl font-semibold">2. Never Stop.</p>
                </div>
            </main>
        </div>
    );
};

export default SalesMindsetGuidePdf;
