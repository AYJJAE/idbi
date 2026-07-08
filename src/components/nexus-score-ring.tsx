'use client';

// =============================================================================
// NEXUS Score Ring — Animated circular score indicator with gradient stroke
// =============================================================================

import { useEffect, useState, useId } from 'react';
import { motion } from 'framer-motion';
import { cn, getScoreHexColor, getScoreGrade } from '@/lib/utils';

interface NexusScoreRingProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  showGrade?: boolean;
  animated?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { diameter: 80, strokeWidth: 5, fontSize: 'text-lg', gradeSize: 'text-[10px]' },
  md: { diameter: 120, strokeWidth: 6, fontSize: 'text-2xl', gradeSize: 'text-xs' },
  lg: { diameter: 160, strokeWidth: 7, fontSize: 'text-3xl', gradeSize: 'text-xs' },
  xl: { diameter: 220, strokeWidth: 9, fontSize: 'text-5xl', gradeSize: 'text-base' },
};

export function NexusScoreRing({
  score,
  maxScore = 900,
  size = 'lg',
  showLabel = true,
  showGrade = true,
  animated = true,
  className,
}: NexusScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const config = SIZE_CONFIG[size];
  const radius = (config.diameter - config.strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(score / maxScore, 1);
  const strokeDashoffset = circumference - circumference * percentage;
  const scoreColor = getScoreHexColor(score);
  const grade = getScoreGrade(score);
  const gradientId = useId();

  // Animate the score number counting up
  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    let frame: number;
    const duration = 1500; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score, animated]);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        viewBox={`0 0 ${config.diameter} ${config.diameter}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={scoreColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={scoreColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-muted/30"
        />
        {/* Score arc */}
        <motion.circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
          }}
        />
      </svg>

      {/* Center content */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn('nexus-financial font-bold tracking-tight', config.fontSize)}
            style={{ color: scoreColor }}
          >
            {displayScore}
          </span>
          {showGrade && (
            <span
              className={cn(
                'font-semibold uppercase tracking-[0.15em]',
                config.gradeSize
              )}
              style={{ color: scoreColor, opacity: 0.8 }}
            >
              {grade}
            </span>
          )}
          {size === 'xl' && (
            <span className="mt-1 text-[10px] text-muted-foreground">
              out of {maxScore}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
