'use client';

import { ReactNode, useEffect } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async () => {
      // Dynamic import to support v5
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return <>{children}</>;
}
