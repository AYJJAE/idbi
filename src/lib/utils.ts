// =============================================================================
// NEXUS — Utility Functions
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian Rupee currency.
 * Examples: 2420000 → "₹24.2L", 24200000 → "₹2.42Cr"
 */
export function formatCurrency(
  value: number,
  options?: { compact?: boolean; decimals?: number }
): string {
  const { compact = true, decimals = 2 } = options ?? {};

  if (!compact) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: decimals,
    }).format(value);
  }

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) {
    return `${sign}₹${(absValue / 10000000).toFixed(decimals)}Cr`;
  }
  if (absValue >= 100000) {
    return `${sign}₹${(absValue / 100000).toFixed(decimals)}L`;
  }
  if (absValue >= 1000) {
    return `${sign}₹${(absValue / 1000).toFixed(decimals)}K`;
  }
  return `${sign}₹${absValue.toFixed(decimals)}`;
}

/**
 * Formats a number as a percentage string.
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Formats a number in compact notation.
 */
export function formatCompactNumber(value: number): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 10000000) {
    return `${sign}${(absValue / 10000000).toFixed(1)}Cr`;
  }
  if (absValue >= 100000) {
    return `${sign}${(absValue / 100000).toFixed(1)}L`;
  }
  if (absValue >= 1000) {
    return `${sign}${(absValue / 1000).toFixed(1)}K`;
  }
  return `${sign}${absValue.toString()}`;
}

/**
 * Returns relative time string from a timestamp.
 */
export function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * Returns the color class for a score (0-900 scale).
 */
export function getScoreColor(score: number): string {
  if (score >= 800) return 'text-emerald-500';
  if (score >= 650) return 'text-blue-500';
  if (score >= 450) return 'text-amber-500';
  return 'text-rose-500';
}

/**
 * Returns the background color class for a score.
 */
export function getScoreBgColor(score: number): string {
  if (score >= 800) return 'bg-emerald-500';
  if (score >= 650) return 'bg-blue-500';
  if (score >= 450) return 'bg-amber-500';
  return 'bg-rose-500';
}

/**
 * Returns the hex color for a score (0-900 scale).
 */
export function getScoreHexColor(score: number): string {
  if (score >= 800) return '#10b981';
  if (score >= 650) return '#3b82f6';
  if (score >= 450) return '#f59e0b';
  return '#ef4444';
}

/**
 * Returns the grade label for a score (0-900 scale).
 */
export function getScoreGrade(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 650) return 'Good';
  if (score >= 450) return 'Fair';
  if (score >= 250) return 'Poor';
  return 'Critical';
}

/**
 * Returns the color for a dimension score (0-100 scale).
 */
export function getDimensionColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

/**
 * Returns the severity color for alerts.
 */
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'success': return 'text-emerald-500';
    case 'warning': return 'text-amber-500';
    case 'critical': return 'text-rose-500';
    case 'info':
    default: return 'text-blue-500';
  }
}

/**
 * Returns the severity background for alert badges.
 */
export function getSeverityBg(severity: string): string {
  switch (severity) {
    case 'success': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
    case 'warning': return 'bg-amber-500/10 text-amber-700 border-amber-200';
    case 'critical': return 'bg-rose-500/10 text-rose-700 border-rose-200';
    case 'info':
    default: return 'bg-blue-500/10 text-blue-700 border-blue-200';
  }
}
