'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalToSlotProps {
  targetId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PortalToSlot({ targetId, children, fallback }: PortalToSlotProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    setContainer(el);

    const computeVisible = () => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const update = () => setIsVisible(computeVisible());
    update();
    window.addEventListener('resize', update);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;
    ro?.observe(document.documentElement);

    return () => {
      window.removeEventListener('resize', update);
      ro?.disconnect();
    };
  }, [targetId]);

  if (container && isVisible) {
    return createPortal(children, container);
  }

  return <>{fallback ?? children}</>;
}


