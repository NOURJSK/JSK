'use client';

import { getErrorFromErrors } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { FieldError } from 'react-hook-form';

interface FormInputProps {
  register: any;
  name: string;
  label?: string;
  errors: any;
  required?: boolean;
  options?: any;
  [key: string]: any;
}

export default function FormInput({
  register,
  name,
  label,
  errors,
  required = false,
  options = {},
  ...props
}: FormInputProps) {
  const error: FieldError = getErrorFromErrors(name, errors);
  const isError = !!error;
  const isSuccess = !isError && props.value && props.value.length > 0;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-white/80 text-sm font-medium">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <Input
        id={name}
        {...register(name, options)}
        {...props}
        className={cn(
          "w-full h-14 px-4 bg-white/10 border rounded-lg text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 text-lg",
          isError 
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
            : isSuccess
            ? "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            : "border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:bg-white/15"
        )}
      />
      {isError && (
        <p className="text-red-400 text-sm flex items-center space-x-1">
          <span>⚠</span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
}