'use client';

// =============================================================================
// NEXUS Page Header — Premium typography with refined hierarchy
// =============================================================================

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn('flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between pb-2', className)}
    >
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground mb-1">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-border/60">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-muted-foreground leading-relaxed max-w-2xl">{description}</p>
        )}
      </div>
      {actions && (
        <div className="mt-3 flex items-center gap-2 sm:mt-0">
          {actions}
        </div>
      )}
    </motion.div>
  );
}
