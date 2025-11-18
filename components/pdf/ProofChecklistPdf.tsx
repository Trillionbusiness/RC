
import React from 'react';

// --- Reusable PDF Components ---
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => <h1 className="text-6xl font-black text-gray-900 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h1>;
const Subtitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-2xl text-gray-600 mt-2">{children}</p>;
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-5xl font-black text-gray-800 pb-3 mb-6 mt-10 break-after-avoid" style={{ fontFamily: "'Patrick Hand', cursive" }}>{children}</h2>;
const P: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => <p className={`text-base text-gray-700 leading-relaxed my-3 ${className || ''}`}>{children}</p>;

const ProofItem: React.FC<{ better: string, worse: string, description: string }> = ({ better, worse, description }) => (
    <div className="p-4 bg-white rounded-lg border-2 border-gray-200 shadow-md break-inside-avoid">
         <div className="flex items-center">
            <div className="w-8 h-8 border-4 border-gray-400 rounded-md mr-4 flex-shrink-0"></div>
            <div>
                 <div className="flex justify-start items-center text-center font-bold text-lg">
                    <span className="p-1 bg-green-100 text-green-800 rounded-md">{better}</span>
                    <span className="text-gray-500 mx-2">{'>'}</span>
                    <span className="p-1 bg-red-100 text-red-800 rounded-md">{worse}</span>
                </div>
            </div>
        </div>
        <P className="text-sm mt-3 pl-12 text-gray-600">{description}</P>
    </div>
);


const ProofChecklistPdf: React.FC = () => {
    const checklistItems = [
        { better: "In-Person", worse: "Virtual", description: "Seeing something with your own eyes is always more believable." },
        { better: "Live", worse: "Recorded", description: "A live demo or testimonial feels more authentic and harder to fake." },
        { better: "Raw", worse: "Processed", description: "An unedited, shaky iPhone video feels more real than a slick production." },
        { better: "Show", worse: "Tell", description: "Show the packed gym instead of just saying you have lots of members." },
        { better: "Others Saying It", worse: "You Saying It", description: "A customer's words are 10x more powerful and believable than your own." },
        { better: "Identical to Them", worse: "Opposite of Them", description: "People trust testimonials from others who look, sound, and feel just like them." },
        { better: "Personal & Specific", worse: "Generic", description: "'My thighs chafed' is infinitely better and more relatable than 'I was overweight'." },
        { better: "Big, Specific Results", worse: "Small Results", description: "One huge, jaw-dropping result is more compelling than ten mediocre ones." },
        { better: "Newer Proof", worse: "Older Proof", description: "A success story from last week beats one from last year, every time." },
        { better: "More Proof", worse: "Less Proof", description: "A 'floor-to-ceiling' wall of 100s of testimonials is overwhelmingly persuasive." },
        { better: "3rd Party Verified", worse: "Zero Verification", description: "A review on Google or a trusted site is more credible than one on your own website." },
        { better: "With Numbers", worse: "Without Numbers", description: "'54.1% of users make money' is a fact; 'lots of users make money' is an opinion." },
        { better: "Simple Metaphors", worse: "Technical Jargon", description: "Explain complex ideas in simple terms people already understand. 'It's like an investment account for your business' is better than explaining SEO." }
    ];

    return (
        <div className="p-12 bg-[#FEFBF6] font-sans text-gray-900" style={{border: '8px solid #3A3A3A'}}>
            <header className="text-center mb-12">
                <Title>The Proof Checklist</Title>
                <Subtitle>How To Get Strangers To Believe You Instantly.</Subtitle>
            </header>
            <main>
                <div className="p-6 bg-yellow-50 border-4 border-yellow-300 rounded-lg my-6 text-center shadow-lg">
                    <h3 className="text-3xl font-bold text-yellow-800" style={{ fontFamily: "'Patrick Hand', cursive" }}>The Most Important Rule:</h3>
                    <P className="italic text-2xl mt-2">"Your promise is not a differentiator. <strong className="font-semibold">Your proof is.</strong>"</P>
                </div>

                <SectionTitle>The 13-Point Proof Checklist ✅</SectionTitle>
                <P>The more of these boxes you can check in your marketing, the more believable your claims become. The more believable your claims, the more you sell. It's that simple.</P>
                
                <div className="columns-2 gap-6 space-y-6 mt-6">
                    {checklistItems.map(item => (
                        <ProofItem key={item.better} better={item.better} worse={item.worse} description={item.description} />
                    ))}
                </div>

                 <div className="mt-16 text-center p-8 bg-gray-800 text-white rounded-lg break-before-page">
                    <h3 className="text-4xl font-black text-yellow-400" style={{ fontFamily: "'Patrick Hand', cursive" }}>Your Mission: Collect & Display Proof</h3>
                    <P className="text-xl mt-2 text-gray-300">Stop making claims. Start proving them. This is how you win.</P>
                </div>
            </main>
        </div>
    );
};

export default ProofChecklistPdf;
