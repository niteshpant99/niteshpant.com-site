import React from 'react';

export default function PromptLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative w-full">
      {/* full-bleed wrapper to escape root max-width */}
      <div className="w-screen -ml-[calc(50vw-50%)] -mr-[calc(50vw-50%)]">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          {/* 1 col on mobile; 12-col grid on lg+ with editor centered */}
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Left sidebar slot (Preview/Exports) */}
            <div
              id="prompt-left-slot"
              className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 max-h-[calc(100dvh-8rem)] overflow-auto"
            />

            {/* Center: editor (children) */}
            <div className="min-w-0 lg:col-span-6">
              {children}
            </div>

            {/* Right sidebar slot (Stats/Tags) */}
            <div
              id="prompt-right-slot"
              className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 max-h-[calc(100dvh-8rem)] overflow-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


