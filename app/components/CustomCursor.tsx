'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const { pointerEnabled, pointerStyle, pointerEffects } = useTheme();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [elementRect, setElementRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: string;
  } | null>(null);

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotSpringConfig = { stiffness: 800, damping: 50, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  const ringTargetX = useMotionValue(-100);
  const ringTargetY = useMotionValue(-100);

  const ringSpringConfig = { stiffness: 250, damping: 30, mass: 0.5 };
  const ringX = useSpring(ringTargetX, ringSpringConfig);
  const ringY = useSpring(ringTargetY, ringSpringConfig);

  useEffect(() => {
    const detectTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches
      );
    };
    detectTouch();

    if (isTouchDevice || !pointerEnabled) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hoveredElement || !pointerEffects) {
        ringTargetX.set(e.clientX);
        ringTargetY.set(e.clientY);
      }
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      if (pointerEffects) {
        setRipples((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
      }
    };
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('summary') ||
        target.classList.contains('cursor-pointer');

      if (clickable) {
        const elem = clickable instanceof Element ? clickable : target;
        const shouldSnap = !elem.closest('.no-snap');
        if (shouldSnap) {
          setHoveredElement(elem as HTMLElement);
        } else {
          setHoveredElement(null);
        }
        setIsHovered(true);
      } else {
        setHoveredElement(null);
        setIsHovered(false);
      }

      const isInputField =
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[contenteditable="true"]') ||
        target.closest('select');

      if (isInputField && target.tagName === 'INPUT') {
        const inputType = (target as HTMLInputElement).type;
        if (['submit', 'button', 'reset', 'checkbox', 'radio'].includes(inputType)) {
          setIsInput(false);
          setIsHovered(true);
          return;
        }
      }

      setIsInput(!!isInputField);
    };

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [pointerEnabled, isTouchDevice, isVisible, mouseX, mouseY, hoveredElement, pointerEffects, ringTargetX, ringTargetY]);

  // Handle position snapping calculations on scroll, resize, or intervals
  useEffect(() => {
    if (!hoveredElement || !pointerEffects) {
      setElementRect(null);
      return;
    }

    const updateRect = () => {
      const rect = hoveredElement.getBoundingClientRect();
      const style = window.getComputedStyle(hoveredElement);
      setElementRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
        borderRadius: style.borderRadius || '8px',
      });
    };

    updateRect();
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect);

    const interval = setInterval(updateRect, 100);

    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
      clearInterval(interval);
    };
  }, [hoveredElement, pointerEffects]);

  // React to elementRect updates and snap the ringTarget position
  useEffect(() => {
    if (elementRect && pointerEffects) {
      ringTargetX.set(elementRect.x);
      ringTargetY.set(elementRect.y);
    } else {
      ringTargetX.set(mouseX.get());
      ringTargetY.set(mouseY.get());
    }
  }, [elementRect, pointerEffects, mouseX, mouseY, ringTargetX, ringTargetY]);

  if (!pointerEnabled || isTouchDevice) return null;

  const showCursor = isVisible && !isInput;

  const getRingScale = () => {
    if (isClicked) return 0.8;
    if (isHovered) return 1.8;
    return 1;
  };

  const getRingDimensions = () => {
    if (elementRect && pointerEffects) {
      return {
        width: elementRect.width + 12,
        height: elementRect.height + 12,
        borderRadius: elementRect.borderRadius,
      };
    }
    const scale = getRingScale();
    return {
      width: 32 * scale,
      height: 32 * scale,
      borderRadius: '9999px',
    };
  };

  const dimensions = getRingDimensions();

  const renderCursorStyle = () => {
    switch (pointerStyle) {
      case 'glowing':
        return (
          <>
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-screen z-[99999]"
              animate={{
                width: dimensions.width + 16,
                height: dimensions.height + 16,
                borderRadius: dimensions.borderRadius,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                x: ringX,
                y: ringY,
                backgroundColor: 'var(--cursor-color)',
                opacity: showCursor ? (isHovered ? 0.35 : 0.15) : 0,
                filter: 'blur(8px)',
                transition: 'opacity 0.2s ease',
              }}
            />
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[99999]"
              animate={{
                width: dimensions.width,
                height: dimensions.height,
                borderRadius: dimensions.borderRadius,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                x: ringX,
                y: ringY,
                borderColor: 'var(--cursor-color)',
                opacity: showCursor ? (isHovered ? 0.8 : 0.4) : 0,
                transition: 'opacity 0.2s ease',
              }}
            />
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[99999]"
              style={{
                x: dotX,
                y: dotY,
                width: 6,
                height: 6,
                backgroundColor: 'var(--cursor-color)',
                opacity: showCursor ? 1 : 0,
                scale: isClicked ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
              }}
            />
          </>
        );

      case 'crosshair':
        return (
          <>
            {elementRect && pointerEffects ? (
              <motion.div
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999]"
                animate={{
                  width: dimensions.width,
                  height: dimensions.height,
                  borderRadius: dimensions.borderRadius,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  x: ringX,
                  y: ringY,
                  opacity: showCursor ? 0.9 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: 'var(--cursor-color)', borderRadius: '4px 0 0 0' }} />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: 'var(--cursor-color)', borderRadius: '0 4px 0 0' }} />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: 'var(--cursor-color)', borderRadius: '0 0 0 4px' }} />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: 'var(--cursor-color)', borderRadius: '0 0 4px 0' }} />
              </motion.div>
            ) : (
              <motion.div
                className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999]"
                style={{
                  x: ringX,
                  y: ringY,
                  width: 28,
                  height: 28,
                  opacity: showCursor ? (isHovered ? 0.9 : 0.6) : 0,
                  scale: getRingScale(),
                  rotate: isHovered ? 45 : 0,
                  transition: 'opacity 0.2s ease, scale 0.15s ease, rotate 0.3s ease-out',
                }}
              >
                <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-[var(--cursor-color)]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-[var(--cursor-color)]" />
              </motion.div>
            )}
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[99999]"
              style={{
                x: dotX,
                y: dotY,
                width: 4,
                height: 4,
                backgroundColor: 'var(--cursor-color)',
                opacity: showCursor ? 1 : 0,
              }}
            />
          </>
        );

      case 'classic':
      default:
        return (
          <>
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[99999] mix-blend-difference"
              animate={{
                width: dimensions.width,
                height: dimensions.height,
                borderRadius: dimensions.borderRadius,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                x: ringX,
                y: ringY,
                borderColor: 'var(--cursor-color)',
                backgroundColor: isHovered ? 'var(--cursor-glow-color)' : 'transparent',
                opacity: showCursor ? (isHovered ? 0.35 : 0.6) : 0,
                transition: 'opacity 0.2s ease, background-color 0.2s ease',
              }}
            />
            <motion.div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[99999]"
              style={{
                x: dotX,
                y: dotY,
                width: 8,
                height: 8,
                backgroundColor: 'var(--cursor-color)',
                opacity: showCursor ? (isHovered ? 0.3 : 1) : 0,
                scale: isClicked ? 0.5 : 1,
                transition: 'opacity 0.2s ease',
              }}
            />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {renderCursorStyle()}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none z-[99998]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 16,
              height: 16,
              borderColor: 'var(--cursor-color)',
              borderWidth: '1.5px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
