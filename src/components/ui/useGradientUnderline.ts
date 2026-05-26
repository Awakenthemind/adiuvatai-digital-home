'use client';

import { useEffect, useRef } from 'react';

export function useGradientUnderline(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('underline-active');
    return () => el.classList.remove('underline-active');
  }, [ref]);
}
