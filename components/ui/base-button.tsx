'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

export type BaseButtonProps = ButtonProps;

export const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    return <Button ref={ref} {...props} />;
  }
);
BaseButton.displayName = 'BaseButton';
