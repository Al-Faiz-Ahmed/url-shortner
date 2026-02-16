import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client/react";

import { CREATE_SHORT_URL_MUTATION } from "@/graphql/mutations/createShortUrl";
import type {
  CreateShortUrlResponse,
  CreateShortUrlVariables,
} from "@/graphql/mutations/createShortUrl";
// import { graphqlErrorHandler } from "@/graphql/errors/graphqlErrorHandler";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  shortUrlSchema,
  type ShortUrlFormValues,
} from "@/schemas/shortUrl.schema";
import { STORAGE_KEYS } from "@/utils/constants";
import type { GeneratedURL } from "@/types";
import { toFormikValidate } from "zod-formik-adapter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FormStatus = {
  error?: string;
};

export function ShortUrlForm() {
  const [items, setItems] = useLocalStorage<GeneratedURL[]>(
    STORAGE_KEYS.SHORTENED_URLS,
    [],
  );

  const [createShortUrl, { loading }] = useMutation<
    CreateShortUrlResponse,
    CreateShortUrlVariables
  >(CREATE_SHORT_URL_MUTATION);

  const onFormSubmit = async (values: any, helpers: any) => {
    console.log({ values, helpers, loading, items });
    const { resetForm, setStatus } = helpers;
    setStatus({});

    try {
      const { data } = await createShortUrl({
        variables: { url: values.url },
      });

      if (data?.createShortUrl) {
        const payload = data.createShortUrl;
        setItems((prev) => [...prev, payload]);
        resetForm();
      }
    } catch (error: any) {
      // const message = graphqlErrorHandler(error);
      setStatus({ error: error ? error.message : "" });
    }
  };

  // const latest = items.length ? items[items.length - 1] : undefined;

  return (
    <div className="w-full max-w-2xl">

    
    <Formik<ShortUrlFormValues, FormStatus>
      initialValues={{ url: "" }}
      validationSchema={toFormikValidate(shortUrlSchema)}
      onSubmit={onFormSubmit}
      
    >
      {({ status }) => (
        <Form className="space-y-4 w-full ">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1 ">
              <Input placeholder="Paste URL here" size="xs" />
            </div>
            <Button className="px-6" size="sm">Tinify</Button>
          </div>

          {status?.error && (
            <p className="text-sm text-destructive" role="alert">
              {status.error}
            </p>
          )}

          
        </Form>
      )}
    </Formik>
    </div>
  );
}
