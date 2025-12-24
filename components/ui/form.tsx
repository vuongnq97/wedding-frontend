'use client';

import * as React from "react";
import {Controller, type ControllerProps, FormProvider, useFormContext, type FieldPath, type FieldValues} from "react-hook-form";
import {Slot} from "@radix-ui/react-slot";

import {cn} from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue = {
  name: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const {formState} = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const {name} = fieldContext;
  const fieldState = formState.errors?.[name as keyof typeof formState.errors];

  return {
    id: itemContext?.id ?? name,
    name,
    formItemId: itemContext ? `${itemContext.id}-form-item` : `${name}-form-item`,
    formDescriptionId: itemContext ? `${itemContext.id}-form-item-description` : `${name}-form-item-description`,
    formMessageId: itemContext ? `${itemContext.id}-form-item-message` : `${name}-form-item-message`,
    error: fieldState,
  };
}

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: name as string}}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<{id: string} | undefined>(undefined);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{id}}>
      <div ref={ref} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({className, ...props}, ref) => {
    const {formItemId} = useFormField();

    return <label ref={ref} className={cn("text-sm font-medium", className)} htmlFor={formItemId} {...props} />;
  },
);
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<typeof Slot>>(({className, ...props}, ref) => {
  const {formItemId} = useFormField();

  return <Slot ref={ref} id={formItemId} className={className} {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, ...props}, ref) => {
    const {formDescriptionId} = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({className, children, ...props}, ref) => {
    const {error, formMessageId} = useFormField();
    const body = error ? String(error.message ?? children) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm text-red-500", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
