import React from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ width, height, borderRadius, className, style, ...props }: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
      {...props}
    />
  );
}
