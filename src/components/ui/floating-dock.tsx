"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-[72px] gap-4 items-end rounded-full bg-background/60 backdrop-blur-xl border border-border/50 px-6 pb-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] overflow-x-auto overflow-y-hidden max-w-[100vw]",
        desktopClassName,
        mobileClassName
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = pathname === href;

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [24, 40, 24]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [24, 40, 24]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center relative transition-colors duration-200",
          isActive 
            ? "bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(0,140,90,0.3)]" 
            : "bg-accent/50 dark:bg-accent hover:bg-accent border border-transparent"
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-3 py-1.5 whitespace-pre rounded-md bg-foreground border dark:bg-foreground dark:border-foreground dark:text-background text-background absolute left-1/2 -translate-x-1/2 -top-12 w-fit text-sm font-medium z-50 shadow-xl"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "flex items-center justify-center",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {icon}
        </motion.div>
        {isActive && (
          <motion.div 
            layoutId="active-indicator"
            className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-primary" 
          />
        )}
      </motion.div>
    </Link>
  );
}
