// =============================================================================
// NEXUS — Reusable Form Input Primitives (Hook Form & Zod Compatible)
// =============================================================================

'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown, UploadCloud, CheckCircle2 } from 'lucide-react';

interface BaseInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Helper to render label and error boundary wrapper
function FormFieldWrapper({
  label,
  error,
  children,
  className,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      {label && <label className="text-xs font-semibold text-foreground/80 tracking-wide">{label}</label>}
      {children}
      {error && <p className="text-[10px] font-medium text-destructive">{error}</p>}
    </div>
  );
}

// 1. Text Input
export function FormInput({ name, label, placeholder, className, disabled, type = 'text', ...props }: BaseInputProps & { type?: string }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'transition-all duration-200',
          error && 'border-destructive focus-visible:ring-destructive animate-shake'
        )}
        {...register(name)}
        {...props}
      />
    </FormFieldWrapper>
  );
}

// 2. Select Component
export function FormSelect({ name, label, placeholder, options, className, disabled }: BaseInputProps & { options: { value: string; label: string }[] }) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
            <SelectTrigger className={cn(error && 'border-destructive focus:ring-destructive')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormFieldWrapper>
  );
}

// 3. Date Picker
export function FormDatePicker({ name, label, className, disabled }: BaseInputProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Input
        type="date"
        disabled={disabled}
        className={cn(
          'transition-all duration-200',
          error && 'border-destructive focus-visible:ring-destructive animate-shake'
        )}
        {...register(name)}
      />
    </FormFieldWrapper>
  );
}

// 4. Autocomplete / Combobox with Filtering
export function FormAutocomplete({
  name,
  label,
  placeholder,
  options,
  className,
  disabled,
}: BaseInputProps & { options: { value: string; label: string }[] }) {
  const { control, setValue, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;
  const [open, setOpen] = React.useState(false);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              disabled={disabled}
              className={cn(
                'w-full justify-between text-left font-normal px-3 flex items-center justify-between border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md',
                error && 'border-destructive'
              )}
            >
              {field.value
                ? options.find((opt) => opt.value === field.value)?.label
                : placeholder || 'Search options...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Type to filter..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => {
                          setValue(name, opt.value, { shouldValidate: true });
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn('mr-2 h-4 w-4', field.value === opt.value ? 'opacity-100' : 'opacity-0')}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
    </FormFieldWrapper>
  );
}

// 5. Currency Input (Indian format)
export function FormCurrencyInput({ name, label, placeholder, className, disabled }: BaseInputProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-xs font-semibold text-muted-foreground select-none">₹</span>
        <Input
          type="number"
          placeholder={placeholder || '0.00'}
          disabled={disabled}
          className={cn(
            'pl-7 transition-all duration-200',
            error && 'border-destructive focus-visible:ring-destructive animate-shake'
          )}
          {...register(name, { valueAsNumber: true })}
        />
      </div>
    </FormFieldWrapper>
  );
}

// 6. Percentage Input
export function FormPercentageInput({ name, label, placeholder, className, disabled }: BaseInputProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <div className="relative flex items-center">
        <Input
          type="number"
          step="0.01"
          placeholder={placeholder || '0.00'}
          disabled={disabled}
          className={cn(
            'pr-7 transition-all duration-200',
            error && 'border-destructive focus-visible:ring-destructive animate-shake'
          )}
          {...register(name, { valueAsNumber: true })}
        />
        <span className="absolute right-3 text-xs font-semibold text-muted-foreground select-none">%</span>
      </div>
    </FormFieldWrapper>
  );
}

// 7. GSTIN Input (Auto-uppercased)
export function FormGSTINInput({ name, label, placeholder = '27AABCP1234M1ZX', className, disabled }: BaseInputProps) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Input
        maxLength={15}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'uppercase font-mono tracking-wider transition-all duration-200',
          error && 'border-destructive focus-visible:ring-destructive animate-shake'
        )}
        {...register(name, {
          onChange: (e) => {
            setValue(name, e.target.value.toUpperCase(), { shouldValidate: true });
          },
        })}
      />
    </FormFieldWrapper>
  );
}

// 8. PAN Input (Auto-uppercased)
export function FormPANInput({ name, label, placeholder = 'AABCP1234M', className, disabled }: BaseInputProps) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Input
        maxLength={10}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'uppercase font-mono tracking-wider transition-all duration-200',
          error && 'border-destructive focus-visible:ring-destructive animate-shake'
        )}
        {...register(name, {
          onChange: (e) => {
            setValue(name, e.target.value.toUpperCase(), { shouldValidate: true });
          },
        })}
      />
    </FormFieldWrapper>
  );
}

// 9. Document Upload Component (Simulates upload & parses file metadata)
export function FormDocumentUpload({
  name,
  label,
  allowedExtensions = ['.pdf', '.xlsx', '.csv'],
  maxSizeMB = 10,
  className,
  disabled,
}: BaseInputProps & { allowedExtensions?: string[]; maxSizeMB?: number }) {
  const { control, setValue, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);

  const simulateUpload = (fileName: string) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setValue(name, fileName, { shouldValidate: true });
          setTimeout(() => setUploadProgress(null), 800);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <motion.div
            layout
            initial={false}
            animate={{
              scale: dragActive ? 0.98 : 1,
              borderColor: dragActive ? 'var(--primary)' : error ? 'var(--destructive)' : 'var(--border)',
              backgroundColor: dragActive ? 'hsl(var(--primary)/0.05)' : error ? 'hsl(var(--destructive)/0.05)' : 'hsl(var(--muted)/0.2)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'relative flex flex-col items-center justify-center rounded-xl border border-dashed p-4 md:p-6 text-center cursor-pointer',
              disabled && 'opacity-50 pointer-events-none'
            )}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onDragOver={(e: any) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onDrop={(e: any) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                simulateUpload(file.name);
              }
            }}
          >
            <input
              type="file"
              accept={allowedExtensions.join(',')}
              className="absolute inset-0 cursor-pointer opacity-0 z-10"
              disabled={disabled || uploadProgress !== null}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  simulateUpload(file.name);
                }
              }}
            />
            <AnimatePresence mode="wait">
              {uploadProgress !== null ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full space-y-3 pointer-events-none"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{uploadProgress === 100 ? 'Processing complete' : 'Uploading and parsing...'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-border/50 rounded-full h-2 overflow-hidden shadow-inner">
                    <motion.div
                      className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                    />
                  </div>
                </motion.div>
              ) : field.value ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center pointer-events-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 mb-3 text-emerald-500">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{field.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">Click or drag to replace</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center pointer-events-none"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Drag and drop here, or <span className="text-primary font-semibold">browse</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Supports {allowedExtensions.join(', ')} up to {maxSizeMB}MB
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      />
    </FormFieldWrapper>
  );
}
