import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'text':
        return 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300';
      default:
        return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'py-1 px-3 text-sm';
      case 'large':
        return 'py-3 px-6 text-lg';
      default:
        return 'py-2 px-4';
    }
  };

  return (
    <MuiButton
      className={`${getVariantClass()} ${getSizeClass()} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="loading-spinner" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
