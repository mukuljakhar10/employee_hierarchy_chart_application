import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem, 
  FormHelperText,
  type SelectProps as MuiSelectProps
} from '@mui/material';

interface SelectProps extends Omit<MuiSelectProps, 'variant' | 'onChange'> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error = false,
  helperText,
  placeholder,
  disabled = false,
  required = false,
  fullWidth = true,
  value,
  onChange,
  className = '',
  ...props
}) => {
  const handleChange = (event: any) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={error} 
      required={required}
      disabled={disabled}
      className={className}
    >
      {label && (
        <InputLabel className="dark:text-gray-300">
          {label}
        </InputLabel>
      )}
      
      <MuiSelect
        value={value || ''}
        onChange={handleChange}
        label={label}
        className="dark:text-white"
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <span className="text-gray-500 dark:text-gray-400">
              {placeholder}
            </span>
          </MenuItem>
        )}
        
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      
      {helperText && (
        <FormHelperText className="dark:text-gray-400">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
