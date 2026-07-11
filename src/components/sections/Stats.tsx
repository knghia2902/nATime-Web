'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n';

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: { vi: string; en: string };
  decimals: number;
}

const stats: StatItem[] = [
  {
    value: 10000,
    suffix: '+',
    prefix: '',
    label: { vi: 'Nhân viên quản lý', en: 'Employees Managed' },
    decimals: 0,
  },
  {
    value: 500,
    suffix: '+',
    prefix: '',
    label: { vi: 'Thiết bị kết nối', en: 'Connected Devices' },
    decimals: 0,
  },
  {
    value: 99.9,
    suffix: '%',
    prefix: '',
    label: { vi: 'Uptime hệ thống', en: 'System Uptime' },
    decimals: 1,
  },
  {
    value: 24,
    suffix: '/7',
    prefix: '',
    label: { vi: 'Hỗ trợ kỹ thuật', en: 'Technical Support' },
    decimals: 0,
  },
];

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function useCountUp(
  target: number,
  decimals: number,
  duration: number,
  shouldStart: boolean
): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const value = easedProgress * target;

      setCurrent(Number(value.toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldStart, target, decimals, duration]);

  return current;
}

function StatCard({
  stat,
  isVisible,
  index,
}: {
  stat: StatItem;
  isVisible: boolean;
  index: number;
}) {
  const { t } = useLanguage();
  const count = useCountUp(stat.value, stat.decimals, 2000, isVisible);

  const formattedValue =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : count.toLocaleString('en-US');

  return (
    <div
      className={`
        group relative flex flex-col items-center justify-center p-6 text-center
        sm:p-8 transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Glassmorphism hover card */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 bg-white/0 backdrop-blur-0 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.06] group-hover:backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-indigo-500/10" />

      <div className="relative z-10">
        {/* Stat value */}
        <span className="block text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-[0_0_24px_rgba(129,140,248,0.3)]">
          {stat.prefix}
          {formattedValue}
          {stat.suffix}
        </span>

        {/* Gradient accent line */}
        <span className="mx-auto mt-4 block h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500 group-hover:w-12" />

        {/* Label */}
        <span className="mt-3 block text-sm font-medium tracking-wide text-indigo-200/80 uppercase sm:text-base">
          {t(stat.label)}
        </span>
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    []
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
    >
      {/* Background gradient — dark indigo to purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900" />

      {/* Secondary radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.12), transparent)',
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top edge gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />

      {/* Bottom edge gradient line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>

        {/* Decorative dividers between stats (desktop only) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-around px-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
