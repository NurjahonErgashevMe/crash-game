"use client";

import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import { FC, useRef } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
  duration: number;
};

const AnimatedCounter: FC<AnimatedCounterProps> = ({
  from,
  to,
  animationOptions,
  duration,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!inView) return;

    // Set initial value
    element.textContent = String(from);

    // If reduced motion is enabled in system's preferences
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    animate(from, to, {
      duration: duration,
      ease: "easeOut",
      ...animationOptions,
      onUpdate(value) {
        if (!element) return;
        if (value) {
          element.textContent = value.toFixed(0);
        }
      },
    });
  }, [ref, inView, from, to]);

  return <span ref={ref} />;
};

export default AnimatedCounter;
