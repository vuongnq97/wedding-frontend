'use client';

import {BaseButton} from "@/components/ui/base-button";
import {BaseModal} from "@/components/ui/base-modal";
import {LoginForm, type LoginFormValues} from "@/components/auth/login-form";

type LoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

export function LoginDialog({open, onOpenChange, onSubmit, isSubmitting, errorMessage}: LoginDialogProps) {
  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Sign in"
      description="Access your account to continue."
      footer={
        <BaseButton
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => onOpenChange(false)}
          disabled={isSubmitting}
        >
          Cancel
        </BaseButton>
      }
    >
      <div className="mt-4">
        <LoginForm
          onSubmit={onSubmit}
          onSuccess={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </div>
    </BaseModal>
  );
}
