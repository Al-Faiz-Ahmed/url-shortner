import { useCallback, useMemo, useState } from "react";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import { useMutation } from "@apollo/client/react";

import type { GeneratedURL } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUrls, useUser } from "@/hooks";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  editUrlSchema,
  type EditUrlFormValues,
} from "@/schemas/edit-url.schema";
import {
  UPDATE_URL_BY_ID_MUTATION,
  type UpdateUrlResponse,
  type UpdateUrlVariables,
} from "@/graphql/mutations/gen-short-url";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function parseExpirationDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
}

function isExpired(expirationDate: Date | string): boolean {
  return parseExpirationDate(expirationDate).getTime() < Date.now();
}

export type EditUrlDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: GeneratedURL | null;
};

type FormStatus = {
  error?: string;
};

function getInitialFormValues(
  url: GeneratedURL | null,
): EditUrlFormValues | null {
  if (!url) return null;
  return {
    givenURL: url.givenURL,
    expirationDate: parseExpirationDate(url.expirationDate),
    isBlock: url.isBlock,
  };
}

function formEquals(a: EditUrlFormValues, b: EditUrlFormValues): boolean {
  return (
    a.givenURL === b.givenURL &&
    a.expirationDate.getTime() === b.expirationDate.getTime() &&
    a.isBlock === b.isBlock
  );
}

export default function EditUrlDialog({
  open,
  onOpenChange,
  url,
}: EditUrlDialogProps) {
  const { updateUrl } = useUrls();
  const { user } = useUser();
  const [extendDays, setExtendDays] = useState<0 | 7 | 14 | 30>(0);

  const [updateUrlMutation, { loading }] = useMutation<
    UpdateUrlResponse,
    UpdateUrlVariables
  >(UPDATE_URL_BY_ID_MUTATION);

  const initialValues = useMemo(() => getInitialFormValues(url), [url]);

  const handleClose = useCallback(() => {
    setExtendDays(0);
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = useCallback(
    async (
      values: EditUrlFormValues,
      helpers: FormikHelpers<EditUrlFormValues>,
    ) => {
      const { setStatus } = helpers;
      if (!url || !initialValues || !user) return;

      if (!formEquals(values, initialValues)) {
        setStatus({});

        try {
          const computedIsBlocked =
            values.isBlock || isExpired(values.expirationDate);
          const { data } = await updateUrlMutation({
            variables: {
              userId: user.id,
              urlId: url.id,
              extendDays,
              givenURL: values.givenURL,
              expirationDate: values.expirationDate.toISOString(),
              isBlock: computedIsBlocked,
            },
          });

          const updatedUrl = data?.updateURLbyId;

          if (updatedUrl) {
            updateUrl(url.id, updatedUrl);
          }
          setExtendDays(0);
          toast.success("URL Updated Successfully")
          handleClose();
        } catch (error: any) {
          setStatus({ error: error ? error.message : "" });
        }
      } else {
        handleClose();
      }
    },
    [handleClose, initialValues, updateUrlMutation, updateUrl, url, user],
  );

  if (!url || !initialValues) return null;

  const isExpiredUrl = isExpired(url.expirationDate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-lg border-border bg-background"
      >
        <DialogHeader>
          {isExpiredUrl && (
            <div className="mb-2 space-y-1 rounded-md border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-sm font-medium text-destructive">
                This Url is blocked due to expiration date exceeds.
              </p>
              <p className="text-sm text-foreground">
                If you want to continue this URL working extend the expiration
                date.
              </p>
            </div>
          )}
          <DialogTitle className="text-xl font-semibold text-primary-400">
            Edit and Update Your URL configuration.
          </DialogTitle>
        </DialogHeader>

        <Formik<EditUrlFormValues, FormStatus>
          initialValues={initialValues}
          enableReinitialize
          validationSchema={toFormikValidationSchema(editUrlSchema)}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          validateOnMount={true}
        >
          {({ values, status, isSubmitting, setFieldValue, isValid }) => {
            const isDirty = !formEquals(values, initialValues);
            const effectiveIsBlocked =
              values.isBlock || isExpired(values.expirationDate);
            const isExpiredFromValues = isExpired(values.expirationDate);
            const canToggleBlock = !isExpiredFromValues;

            return (
              <Form className="grid gap-4 py-2">
                <div className="space-y-2">
                  <label
                    htmlFor="edit-given-url"
                    className="text-sm font-medium text-foreground"
                  >
                    Given URL
                  </label>
                  <Field name="givenURL">
                    {({ field, meta }: any) => (
                      <div className="flex flex-col gap-1">
                        <Input
                          {...field}
                          id="edit-given-url"
                          type="url"
                          placeholder="https://example.com"
                          size="sm"
                          aria-label="Given URL to redirect to"
                          aria-invalid={
                            meta.touched && meta.error ? "true" : "false"
                          }
                        />
                        {meta.touched && meta.error && (
                          <p className="text-xs text-destructive" role="alert">
                            {meta.error}
                          </p>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Expiration Date
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {isExpired(url.expirationDate) && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const from = new Date();
                            const next = new Date(from);
                            next.setDate(from.getDate() + 7);
                            setFieldValue("expirationDate", next);
                            setExtendDays(7);
                          }}
                        >
                          +7 days
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const from = new Date();
                            const next = new Date(from);
                            next.setDate(from.getDate() + 14);
                            setFieldValue("expirationDate", next);
                            setExtendDays(14);
                          }}
                        >
                          +14 days
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const from = new Date();
                            const next = new Date(from);
                            next.setDate(from.getDate() + 30);
                            setFieldValue("expirationDate", next);
                            setExtendDays(30);
                          }}
                        >
                          +30 days
                        </Button>
                      </>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {values.expirationDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Block this URL
                    </p>
                    <p className="text-xs text-muted-foreground">
                      When enabled, this URL will be blocked globally. It is
                      also treated as blocked if already expired.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={effectiveIsBlocked}
                    aria-disabled={!canToggleBlock}
                    onClick={() => {
                      if (!canToggleBlock) return;
                      setFieldValue("isBlock", !values.isBlock);
                    }}
                    className={cn(
                      "relative flex items-center h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      canToggleBlock
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-60",
                      effectiveIsBlocked
                        ? "bg-primary border-primary"
                        : "bg-muted-foreground border-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "pointer-events-none inline-block h-5 w-5  rounded-full bg-background shadow-lg ring-0 transition-transform",
                        effectiveIsBlocked
                          ? "translate-x-5"
                          : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>

                {status?.error && (
                  <p className="text-sm text-destructive" role="alert">
                    {status.error}
                  </p>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isDirty || !isValid || loading || isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Update
                  </Button>
                </DialogFooter>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
