
import React from 'react';
import { GeneratedPlaybook } from '../../types';
import FullPlaybook from '../../FullPlaybook';

interface FullPlaybookHtmlProps {
  playbook: GeneratedPlaybook;
}

const TableOfContents: React.FC = () => (
    <div className="mb-12 p-6 bg-gray-50 border-2 border-dashed rounded-lg no-print">
        <h2 className="text-3xl font-black text-center mb-4" style={{color: 'var(--primary-color)'}}>Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2 text-center">
            <li><a href="#step-1-diagnosis" className="text-lg font-semibold text-blue-600 hover:underline">Diagnosis & Roadmap (The GPS)</a></li>
            <li><a href="#step-2-offers" className="text-lg font-semibold text-blue-600 hover:underline">The Grand Slam Offer (The Foundation)</a></li>
            <li><a href="#step-3-leads" className="text-lg font-semibold text-blue-600 hover:underline">The Leads Engine</a></li>
            <li><a href="#step-4-money" className="text-lg font-semibold text-blue-600 hover:underline">The Money Model (The Fuel System)</a></li>
        </ol>
    </div>
);

const FullPlaybookHtml: React.FC<FullPlaybookHtmlProps> = ({ playbook }) => {
  const emptyFunc = () => {};
  
  return (
    <>
      <TableOfContents />
      <FullPlaybook
        playbook={playbook}
        isStatic={true}
        // Provide dummy props for functions not used in static mode
        onDownloadAsset={emptyFunc}
        onPreviewAsset={emptyFunc}
        onPreviewPdf={emptyFunc}
        isAnyPdfGenerating={false}
        generatingAsset={null}
        onDownloadAllAssets={emptyFunc}
        generatingAssetBundleFor={null}
        pdfProgress={0}
        onDownloadZip={emptyFunc}
        isZipping={false}
        zipProgress={0}
        kpiEntries={[]}
        weeklyDebriefs={[]}
        onSaveKpiEntry={emptyFunc}
        onGenerateDebrief={emptyFunc}
        isGeneratingDebrief={false}
      />
    </>
  );
};

export default FullPlaybookHtml;
