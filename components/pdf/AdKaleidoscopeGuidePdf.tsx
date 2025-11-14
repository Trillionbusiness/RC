
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start mt-2">
        <span className="text-xl text-green-500 mr-3">✅</span>
        <P className="flex-grow text-sm">{children}</P>
    </div>
);

const AdKaleidoscopeDiagram: React.FC = () => (
    <div className="my-8 flex justify-center items-center">
        <div className="relative w-80 h-80">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="95" fill="none" stroke="black" strokeWidth="2" />
                <line x1="100" y1="5" x2="100" y2="195" stroke="black" strokeWidth="1.5" />
                <line x1="5" y1="100" x2="195" y2="100" stroke="black" strokeWidth="1.5" />
                <line x1="37" y1="37" x2="163" y2="163" stroke="black" strokeWidth="1.5" />
                <line x1="37" y1="163" x2="163" y2="37" stroke="black" strokeWidth="1.5" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full font-bold text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                <span className="absolute top-[45px] left-1/2 -translate-x-1/2 -rotate-90">REMIX</span>
                <span className="absolute top-1/2 right-[45px] -translate-y-1/2">HEADLINE</span>
                <span className="absolute bottom-[45px] left-1/2 -translate-x-1/2 rotate-90">CLONE</span>
                <span className="absolute top-1/2 left-[45px] -translate-y-1/2 -rotate-180">HOOK</span>
                <span className="absolute top-[18px] left-1/2 -translate-x-1/2">FONT</span>
                <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2">FILTERS</span>
                <span className="absolute top-[60px] right-[25px] rotate-45">VISUAL</span>
                <span className="absolute bottom-[60px] left-[25px] -rotate-45">SCRIPT</span>
            </div>
        </div>
    </div>
);

const AdKaleidoscopeGuidePdf: React.FC = () => {
    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The Ad Kaleidoscope</Title>
                <Subtitle>How to turn one good ad into dozens of winners without breaking a sweat.</Subtitle>
            </header>
            <main>
                <SectionTitle>The Big Idea 💡</SectionTitle>
                <P>Most people think they need to make new ads all the time. That's a sucker's game. The real pros find one ad that works—just one!—and then they milk it for all it's worth. That's the Ad Kaleidoscope.</P>
                <P className="font-bold">Instead of starting from scratch, you take your winning ad and tweak tiny things about it to make dozens of "new" versions. It's less work and makes way more money.</P>
                <AdKaleidoscopeDiagram />

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <SectionTitle>Part 1: Remixing (Easy Mode)</SectionTitle>
                        <P>This is stuff you do *after* the ad is already filmed. It's fast, easy, and you can do most of it with a single click.</P>
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                            <h4 className="font-bold text-lg text-blue-800">Your Remix Checklist:</h4>
                            <CheckListItem><strong>New Speed:</strong> Make it 1.1x or 1.2x faster. Sometimes it just works.</CheckListItem>
                            <CheckListItem><strong>New Filters:</strong> Try black & white, or a different color grade.</CheckListItem>
                            <CheckListItem><strong>New Background:</strong> Swap the background color or add a simple border.</CheckListItem>
                            <CheckListItem><strong>New Fonts/Captions:</strong> Change the style of the text on screen.</CheckListItem>
                            <CheckListItem><strong>New Headline:</strong> Change the text at the very top of the ad.</CheckListItem>
                            <CheckListItem><strong>New Format:</strong> Change a horizontal video to a square or vertical one.</CheckListItem>
                        </div>
                    </div>
                     <div>
                        <SectionTitle>Part 2: Remaking (Pro Mode)</SectionTitle>
                        <P>This takes a little more effort because you have to re-film, but you keep the winning script the same. This makes your ad feel new for years.</P>
                        <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                            <h4 className="font-bold text-lg text-green-800">Your Remake Checklist:</h4>
                            <CheckListItem><strong>New Clone:</strong> Film the exact same ad again. Different lighting or a new shirt is enough to make it feel fresh.</CheckListItem>
                            <CheckListItem><strong>New Props:</strong> Hold something different in your hand (a banana, a stack of cash, a book).</CheckListItem>
                            <CheckListItem><strong>New Examples:</strong> Use the same script but swap out a customer name or a number. Ex: "$4,664" becomes "$6,760".</CheckListItem>
                            <CheckListItem><strong>New Setting:</strong> Film it in your car, at the beach, or in your office.</CheckListItem>
                            <CheckListItem><strong>New Talent:</strong> Have someone else read your winning script.</CheckListItem>
                        </div>
                    </div>
                </div>

                 <div className="mt-16 text-center p-8 bg-gray-800 text-white rounded-lg">
                    <h3 className="text-4xl font-black text-yellow-400" style={{ fontFamily: "'Patrick Hand', cursive" }}>Your Mission: Stop Guessing. Start Winning.</h3>
                    <P className="text-xl mt-2 text-gray-300">Find one winner, then use this guide to make 10 more.</P>
                </div>
            </main>
        </div>
    );
};

export default AdKaleidoscopeGuidePdf;
