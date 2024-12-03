'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

import { cn } from '@lib/utils';

type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (attachToParent && cursorRef.current) {
      const parent = cursorRef.current.parentElement;
      if (!parent) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = parent.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      };

      parent.style.cursor = 'none';
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseenter', () => setIsVisible(true));
      parent.addEventListener('mouseleave', () => setIsVisible(false));

      return () => {
        parent.style.cursor = 'auto';
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseenter', () => setIsVisible(true));
        parent.removeEventListener('mouseleave', () => setIsVisible(false));
      };
    }
  }, [attachToParent]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn('pointer-events-none absolute left-0 top-0', className)}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
      transition={{
        type: "spring",
        damping: 12, // Reduced from 20
        stiffness: 400, // Increased from 200
        mass: 0.2, // Reduced from 0.5
        restSpeed: 0.001 // Added for smoother stop
      }}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{
              duration: 0.1, // Reduced from default
              ease: "easeOut"
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
