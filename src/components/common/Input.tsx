import React from 'react';
import { TextField, type TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  error?: boolean;
  helperText?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  variant = 'outlined',
  error = false,
  helperText,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  fullWidth = true,
  multiline = false,
  rows,
  value,
  onChange,
  onBlur,
  onFocus,
  className = '',
  children,
  ...props
}) => {
  return (
    <TextField
      variant={variant}
      error={error}
      helperText={helperText}
      label={label}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={`search-input ${className}`}
      {...props}
    >
      {children}
    </TextField>
  );
};

export default Input;
