'use client';

import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  onSuccess?: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export function LoginForm({
  onSubmit,
  onSuccess,
  isSubmitting = false,
  errorMessage,
}: LoginFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setFormError(null);

    try {
      await onSubmit(values);
      form.reset();
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign in';
      setFormError(message);
      form.setError('root', { message });
    }
  };

  const displayedError =
    form.formState.errors.root?.message ?? formError ?? errorMessage ?? null;
  const submitting = isSubmitting || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <BaseInput
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={submitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <BaseInput
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={submitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {displayedError ? (
          <p className="text-sm text-red-500">{displayedError}</p>
        ) : null}

        <BaseButton type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </BaseButton>
      </form>
    </Form>
  );
}
