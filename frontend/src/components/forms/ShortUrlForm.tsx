import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client/react";



// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
// import { FormField } from "@/components/ui/FormField";
import { CREATE_SHORT_URL_MUTATION } from "@/graphql/mutations/createShortUrl";
import type {
  CreateShortUrlResponse,
  CreateShortUrlVariables,
} from "@/graphql/mutations/createShortUrl";
// import { graphqlErrorHandler } from "@/graphql/errors/graphqlErrorHandler";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { shortUrlSchema, type ShortUrlFormValues } from "@/schemas/shortUrl.schema";
import { STORAGE_KEYS } from "@/utils/constants";
import type { ShortUrl } from "@/types";
import { toFormikValidate } from "zod-formik-adapter";

type FormStatus = {
  error?: string;
};

export function ShortUrlForm() {
  const [items, setItems] = useLocalStorage<ShortUrl[]>(
    STORAGE_KEYS.SHORTENED_URLS,
    [],
  );

  const [createShortUrl, { loading }] = useMutation<
    CreateShortUrlResponse,
    CreateShortUrlVariables
  >(CREATE_SHORT_URL_MUTATION);

const onFormSubmit = async (values:any, helpers:any) => {
  console.log({values,helpers,loading,items})
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
  } catch (error:any) {
    // const message = graphqlErrorHandler(error);
    setStatus({ error: error ? error.message : "" });
  }
}

  // const latest = items.length ? items[items.length - 1] : undefined;

  return (
    <Card>
      <div className="space-y-4 text-center mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          Get rid of your
        </p>
        <h1 className="font-short-stack text-4xl md:text-5xl text-primary-400">
          Tini Tiny
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Create your first Tini Tiny URL from here and share it with the world.
        </p>
      </div>

      <Formik<ShortUrlFormValues, FormStatus>
        initialValues={{ url: "" }}
        validationSchema={toFormikValidate(shortUrlSchema)}
        onSubmit={onFormSubmit}
      >
        {({status}) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1">
                {/* faizan */}
              </div>
              
            </div>

            {status?.error && (
              <p className="text-sm text-destructive" role="alert">
                {status.error}
              </p>
            )}

            
          </Form>
        )}
      </Formik>
    </Card>
  );
}

