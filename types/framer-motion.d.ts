import * as React from 'react'
import { MotionProps } from 'framer-motion'

declare module 'framer-motion' {
  export interface HTMLMotionProps<TagName extends keyof React.JSX.IntrinsicElements>
    extends Omit<React.ComponentPropsWithoutRef<TagName>, 'style'>,
      MotionProps {
    style?: React.CSSProperties | any
  }
}
