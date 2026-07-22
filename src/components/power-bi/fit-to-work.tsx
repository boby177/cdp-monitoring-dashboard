// components/PowerBIMonitoring.tsx
'use client';

import { useState } from 'react';

export default function PowerBIFitToWork() {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = process.env.NEXT_PUBLIC_POWERBI_FIT_TO_WORK_EMBED_URL;

  if (!embedUrl) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-center">
        Power BI embed URL is not configured. Set NEXT_PUBLIC_POWERBI_FIT_TO_WORK_EMBED_URL in your environment.
      </div>
    );
  }

  return (
    <div className="relative w-full h-[700px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-400">Loading report...</span>
        </div>
      )}
      <iframe
        title="CDP Power BI Fit to Work"
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100' : 'opacity-0'}
      />
    </div>
  );
}