import React from 'react';

export default function NarrowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[640px] w-full mx-auto">
      {children}
    </div>
  );
}