import type { ReactNode } from "react";
import { useField } from "formik";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  /** Optional slot to fully customize the field control. */
  children?: (fieldProps: ReturnType<typeof useField>[0]) => ReactNode;
};

export function FormField({
  name,
  label,
  placeholder,
  type = "text",
  className,
  children,
}: FormFieldProps) {
  const [field, meta] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);
  const fieldId = `field-${name}`;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={fieldId}
        className="text-xs md:text-sm font-medium text-muted-foreground"
      >
        {label}
      </label>

      {children ? (
        children(field)
      ) : (
        <Input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${fieldId}-error` : undefined}
          {...field}
        />
      )}

      <p
        id={`${fieldId}-error`}
        className={cn(
          "min-h-[1.25rem] text-xs md:text-sm text-destructive",
          !hasError && "opacity-0",
        )}
        aria-live="polite"
      >
        {hasError ? meta.error : " "}
      </p>
    </div>
  );
}

