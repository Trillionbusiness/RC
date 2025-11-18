import React from 'react';
import { GeneratedOffer, OfferStackItem } from '../../types';
import MarkdownRenderer from '../common/MarkdownRenderer';

const PageLayout: React.FC<{ children: React.ReactNode, isCover?: boolean }> = ({ children, isCover = false }) => (
    <div className={`p-12 bg-[#FEFBF6] font-sans text-gray-800 relative overflow-hidden break-before-page`} style={{ fontFamily: 'Inter, sans-serif', width: '800px', minHeight: '1131px', border: '8px solid #3A3A3A' }}>
        <div className="relative z-10 flex flex-col h-full" style={{minHeight: '1035px'}}>
            {children}
            {!isCover && <div className="absolute bottom-6 right-6 text-xs text-gray-400 font-bold">Trillion Business AI</div>}
        </div>
    </div>
);


const CoverPage: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => (
    <PageLayout isCover={true}>
        <div className="flex flex-col h-full pt-20 text-center items-center">
            <p className="font-semibold text-gray-600 uppercase tracking-widest">Your Complete Toolkit For...</p>
            <h1 className="text-7xl font-black tracking-tight mt-4 max-w-3xl text-[#147273]" style={{ fontFamily: "'Patrick Hand', cursive" }}>"{offer.name}"</h1>
            <div className="mt-12 mb-8 h-1 bg-yellow-400 w-1/4"></div>
            <p className="text-2xl text-gray-700 mt-4 max-w-2xl">All the templates, guides, and scripts you need to win. No excuses.</p>
            <div className="mt-auto">
                <p className="font-bold text-lg">Trillion Business</p>
            </div>
        </div>
    </PageLayout>
);

const AssetHeader: React.FC<{ type: string; title: string }> = ({ type, title }) => (
    <header className="mb-8 pb-4 border-b-4 border-dotted border-gray-300">
        <div className="flex justify-between items-center text-sm text-gray-500">
            <p className="font-bold uppercase tracking-wider capitalize text-[#147273] text-lg" style={{ fontFamily: "'Patrick Hand', cursive" }}>{type} Inside:</p>
            <p className="font-semibold">{title}</p>
        </div>
    </header>
);

const AssetPage: React.FC<{ asset: NonNullable<OfferStackItem['asset']>, offerName: string }> = ({ asset, offerName }) => (
    <PageLayout>
        <AssetHeader type={asset.type} title={offerName} />
        <main className="flex-grow">
            <h1 className="text-6xl font-black text-[#147273] mb-6 tracking-tight" style={{ fontFamily: "'Patrick Hand', cursive" }}>{asset.name}</h1>
            <div className="prose prose-lg max-w-none text-gray-800">
                <MarkdownRenderer content={asset.content} theme="light" />
            </div>
        </main>
        <footer className="mt-12 pt-4 border-t-2 border-gray-200 text-xs text-gray-500 text-left">
             <p className="font-bold">From Your Friends at Trillion Business</p>
        </footer>
    </PageLayout>
);

const ValueStackAssetsPdf: React.FC<{ offer: GeneratedOffer }> = ({ offer }) => {
    return (
        <div style={{ width: '800px' }}>
            <CoverPage offer={offer} />
            {offer.stack.map((item, index) => {
                if (item.asset) {
                    return <AssetPage key={index} asset={item.asset} offerName={offer.name} />;
                }
                return null;
            })}
        </div>
    );
};

export default ValueStackAssetsPdf;
