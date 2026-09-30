import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type React from 'react';

/**
 * Tilt 3D + flip kartu yang stabil di HP dan desktop.
 *
 * Kenapa ditulis ulang:
 * - Tilt lama memicu re-render React di setiap gerakan jari -> patah-patah.
 *   Sekarang transform ditulis langsung ke elemen (tanpa re-render) lewat requestAnimationFrame.
 * - Flip lama aktif untuk setiap sentuhan < 250 ms, termasuk saat scroll cepat (flick).
 *   Sekarang flip HANYA untuk tap sungguhan: jari nyaris tidak bergerak dan singkat.
 * - Setelah tap, browser HP mengirim event mouse palsu yang membuat tilt "nyangkut".
 *   Sekarang memakai Pointer Events dan mouse hanya diproses bila pointerType === 'mouse'.
 * - Scroll vertikal selalu menang: gerakan dominan vertikal dianggap scroll, kartu tidak tilt.
 *   Tilt di HP dilakukan dengan menggeser jari ke kiri/kanan (boleh miring/diagonal).
 */

export const TAP_MAX_MS = 350;
export const INTENT_PX = 8; // gerakan minimal sebelum arah gestur ditentukan
export const FLIP_COOLDOWN_MS = 450; // cegah dobel-flip saat tap beruntun

export type GestureIntent = 'pending' | 'tilt' | 'scroll';

/** Tentukan maksud gestur dari perpindahan jari sejak menyentuh layar. */
export function classifyGesture(dx: number, dy: number): GestureIntent {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (Math.max(ax, ay) < INTENT_PX) return 'pending';
  return ax >= ay ? 'tilt' : 'scroll';
}

/** Hitung sudut tilt dari posisi pointer relatif terhadap pusat kartu. */
export function computeTilt(
  px: number,
  py: number,
  rect: { left: number; top: number; width: number; height: number },
  maxDeg: number,
): { x: number; y: number } {
  if (!rect.width || !rect.height) return { x: 0, y: 0 };
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const nx = Math.max(-1, Math.min(1, (px - rect.left - cx) / cx));
  const ny = Math.max(-1, Math.min(1, (py - rect.top - cy) / cy));
  return { x: -ny * maxDeg, y: nx * maxDeg };
}

const MOUSE_MAX_DEG = 14;
const TOUCH_MAX_DEG = 14;
const REST_TRANSITION = 'transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1)';

export function useCardTilt(isFlipped: boolean, onTap: () => void) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const tilt = useRef({ x: 0, y: 0 });
  const mode = useRef<GestureIntent | 'none'>('none');
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const raf = useRef<number | null>(null);
  const lastFlipAt = useRef(0);
  const isHoveredRef = useRef(false);
  const flippedRef = useRef(isFlipped);
  const onTapRef = useRef(onTap);
  flippedRef.current = isFlipped;
  onTapRef.current = onTap;

  const apply = useCallback((animate: boolean) => {
    const el = cardRef.current;
    if (!el) return;
    const flip = flippedRef.current ? 180 : 0;
    el.style.transition = animate ? REST_TRANSITION : 'none';
    el.style.transform = `rotateX(${tilt.current.x.toFixed(2)}deg) rotateY(${(tilt.current.y + flip).toFixed(2)}deg)`;
  }, []);

  // Sinkronkan transform setiap render / saat flip berubah (aman: nilai sama tidak memulai ulang animasi).
  useLayoutEffect(() => {
    apply(mode.current !== 'tilt');
  });

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  const scheduleTilt = useCallback(
    (clientX: number, clientY: number, maxDeg: number) => {
      const el = cardRef.current;
      if (!el) return;
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        if (!cardRef.current) return;
        tilt.current = computeTilt(clientX, clientY, cardRef.current.getBoundingClientRect(), maxDeg);
        apply(false);
      });
    },
    [apply],
  );

  const resetTilt = useCallback(() => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
    tilt.current = { x: 0, y: 0 };
    mode.current = 'none';
    start.current = null;
    setIsHovered(false);
    apply(true);
  }, [apply]);

  const releaseCapture = (e: React.PointerEvent<HTMLElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* abaikan */
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' || !e.isPrimary) return;
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    mode.current = 'pending';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') {
      if (!isHoveredRef.current) {
        isHoveredRef.current = true;
        setIsHovered(true);
      }
      scheduleTilt(e.clientX, e.clientY, MOUSE_MAX_DEG);
      return;
    }

    const s = start.current;
    if (!s || !e.isPrimary) return;

    if (mode.current === 'pending') {
      const intent = classifyGesture(e.clientX - s.x, e.clientY - s.y);
      if (intent === 'pending') return;
      mode.current = intent;
      if (intent === 'tilt') {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* abaikan */
        }
        isHoveredRef.current = true;
        setIsHovered(true);
      }
    }

    if (mode.current === 'tilt') {
      scheduleTilt(e.clientX, e.clientY, TOUCH_MAX_DEG);
    }
    // mode 'scroll': biarkan browser menggulir halaman, kartu tidak disentuh.
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') return;
    const s = start.current;
    const wasPending = mode.current === 'pending';
    releaseCapture(e);

    if (s && wasPending) {
      const now = performance.now();
      if (now - s.t < TAP_MAX_MS && now - lastFlipAt.current > FLIP_COOLDOWN_MS) {
        lastFlipAt.current = now;
        onTapRef.current();
      }
    }
    isHoveredRef.current = false;
    resetTilt();
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse') return;
    releaseCapture(e);
    isHoveredRef.current = false;
    resetTilt(); // scroll dimulai browser -> batal, tanpa flip
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    isHoveredRef.current = false;
    resetTilt();
  };

  return {
    cardRef,
    isHovered,
    resetTilt,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onPointerLeave },
  };
}