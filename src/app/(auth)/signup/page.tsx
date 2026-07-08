'use client';

// =============================================================================
// NEXUS Signup Page
// =============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight, Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp } from '@/lib/animations';

// ---------------------------------------------------------------------------
// Validation Schema
// ---------------------------------------------------------------------------

const signupSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  gstin: z
    .string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Please enter a valid 15-digit GSTIN'
    ),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

type SignupFormData = z.infer<typeof signupSchema>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    console.log('Signup attempt:', data.email, data.businessName);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push('/');
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Branding */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
          <span className="text-xl font-bold text-primary-foreground">N</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Register your business on NEXUS
        </p>
      </div>

      {/* Form Card */}
      <Card className="border-border/60 shadow-xl shadow-black/5">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium text-foreground">
                Business Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="businessName"
                  placeholder="Pinnacle Engineering Pvt Ltd"
                  className={`pl-10 ${errors.businessName ? 'border-destructive' : ''}`}
                  {...register('businessName')}
                />
              </div>
              {errors.businessName && (
                <p className="text-xs text-destructive">{errors.businessName.message}</p>
              )}
            </div>

            {/* GSTIN */}
            <div className="space-y-2">
              <label htmlFor="gstin" className="text-sm font-medium text-foreground">
                GSTIN
              </label>
              <Input
                id="gstin"
                placeholder="27AABCP1234M1ZX"
                className={`uppercase ${errors.gstin ? 'border-destructive' : ''}`}
                maxLength={15}
                {...register('gstin')}
              />
              {errors.gstin && (
                <p className="text-xs text-destructive">{errors.gstin.message}</p>
              )}
              <p className="text-[11px] text-muted-foreground">
                Your 15-digit Goods and Services Tax Identification Number
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Work Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 characters, 1 uppercase, 1 number"
                  autoComplete="new-password"
                  {...register('password')}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Terms */}
            <p className="text-[11px] text-muted-foreground">
              By creating an account, you agree to our{' '}
              <a href="#" className="font-medium text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
