'use client';

import React, { useState, useRef, useLayoutEffect, cloneElement, useEffect } from 'react';
import Link from 'next/link';

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
  href?: string;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Sync active index if prop changes (for route changes)
  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-2xl bg-white text-[#0F1C36] shadow-sm border border-gray-100 px-2 ${className}`}>
      {items.map(({ id, icon, label, onClick, href }, index) => {
        const content = (
          <div className="flex items-center gap-2">
            {cloneElement(icon, {
              className: `w-5 h-5 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-blue-600 scale-110' : 'opacity-60 text-gray-500 scale-100'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            })}
            {label && (
              <span className={`text-sm font-semibold transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-[#0F1C36]' : 'opacity-70 text-gray-500'
              }`}>
                {label}
              </span>
            )}
          </div>
        );

        return href ? (
          <Link
            key={id}
            href={href}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-4 px-6 hover:bg-gray-50/50 rounded-xl transition-colors ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {content}
          </Link>
        ) : (
          <a
            key={id}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-4 px-6 hover:bg-gray-50/50 rounded-xl transition-colors ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {content}
          </a>
        );
      })}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-16 h-[3px] rounded-full bg-blue-600 shadow-[0_5px_15px_rgba(37,99,235,0.5)] ${
          isReady ? 'transition-[left] duration-300 ease-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-20%] top-[3px] w-[140%] h-12 [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)] bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};