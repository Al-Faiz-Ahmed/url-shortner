import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useMutation } from "@apollo/client/react";

import { CREATE_SHORT_URL_MUTATION } from "@/graphql/mutations/gen-short-url";
import type {
  CreateShortUrlResponse,
  CreateShortUrlVariables,
} from "@/graphql/mutations/gen-short-url";

import {
  shortUrlSchema,
  type ShortUrlFormValues,
} from "@/schemas/short-url.schema";

import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUrls, useUser } from "@/hooks";
import { createUniqueHash } from "@/utils/unique-hash";

type FormStatus = {
  error?: string;
};

export function ShortUrlForm() {
  const { user, setUser } = useUser();
  const { addUrl } = useUrls();

  const [createShortUrl, { loading }] = useMutation<
    CreateShortUrlResponse,
    CreateShortUrlVariables
  >(CREATE_SHORT_URL_MUTATION);

  const onFormSubmit = async (
    values: {
      url: string;
    },
    helpers: FormikHelpers<{
      url: string;
    }>,
  ) => {
    const { resetForm, setStatus } = helpers;

    if(user && user.totalShortenedURL >= 5){
      setStatus({ error: "5 URLs Generation Limit reached" });
      return;
    }

    const uniqueHashRes = createUniqueHash(5);

    if (uniqueHashRes.uniqueHash === null) {
      console.error(uniqueHashRes.error);
      return;
    }
    console.log(uniqueHashRes.uniqueHash);
    console.log({ values, helpers, user });
    let userId = "";

    if (user && user.id) {
      userId = user.id;
    }

    setStatus({});

    try {
      const { data, error } = await createShortUrl({
        variables: userId
          ? {
              givenURL: values.url,
              uniqueHash: uniqueHashRes.uniqueHash,
              userId,
            }
          : {
              givenURL: values.url,
              uniqueHash: uniqueHashRes.uniqueHash,
            },
      });

      console.log(data, error);

      if (data?.generateUniqueURL) {
        const payload = data.generateUniqueURL;
        addUrl(payload);
        if (user) {
          setUser({ ...user, totalShortenedURL: user.totalShortenedURL+1 });
        }

        resetForm();
      }
    } catch (error: any) {
      
      setStatus({ error: error ? error.message : "" });
    }
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <Formik<ShortUrlFormValues, FormStatus>
        initialValues={{ url: "" }}
        validationSchema={toFormikValidationSchema(shortUrlSchema)}
        onSubmit={onFormSubmit}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ status, values, errors, touched }) => (
          <Form className="space-y-4 w-full ">
            <div className="flex gap-3 ">
              <div className="flex-1 ">
                <Field name="url">
                  {({ field, meta }: any) => (
                    <div className="flex flex-col gap-1">
                      <Input
                        {...field}
                        placeholder="Paste URL here"
                        size="xs"
                        aria-invalid={
                          meta.touched && meta.error ? "true" : "false"
                        }
                        aria-describedby={
                          meta.touched && meta.error ? "url-error" : undefined
                        }
                        type="url"
                      />
                      {!status?.error && meta.touched && meta.error && (
                        <p
                          id="url-error"
                          className="text-xs text-destructive text-left"
                          role="alert"
                        >
                          {meta.error}!
                        </p>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3 sm:px-6 cursor-pointer"
                disabled={
                  loading || !values.url || (touched.url && errors.url)
                    ? true
                    : false
                }
              >
                {loading ? "Tinifying..." : "Tinify"}
              </Button>
            </div>

            {status?.error && (
              <p className="text-sm text-destructive text-left" role="alert">
                {status.error}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
