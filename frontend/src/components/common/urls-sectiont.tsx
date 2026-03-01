import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useUrlActions, useUrls, useUser } from "@/hooks";
import { useLazyQuery } from "@apollo/client/react";
import { Trash2 } from "lucide-react";

import { useEffect } from "react";
import { Button } from "../ui/button";
import UrlCard from "./url-card";
import {
  GET_URL_BY_ID_QUERY,
  type GetUrlsResponse,
  type GetUrlsVariables,
} from "@/graphql/queries/get-urls";

const GeneratedUrlSection = () => {
  const [fetchUser] = useLazyQuery<GetUserResponse, GetUserVariables>(
    GET_USER_QUERY,
  );
  const [fetchUrls] = useLazyQuery<GetUrlsResponse, GetUrlsVariables>(
    GET_URL_BY_ID_QUERY,
  );

  const { user, setUser } = useUser();
  const { urls, setUrls,selectedUrls } = useUrls();

  // const {} = useUrlActions()

  useEffect(() => {
    (async () => {
      if (!user) {
        const result = await fetchUser();

        if (result.error) {
          console.log({ ...result.error }, "Error From Fetched User");
          return;
        }

        if (result.data) {
          setUser(result.data.getUser);
          const userId = result.data.getUser.id;
          const getUrls = await fetchUrls({ variables: { userId } });

          if (getUrls.error) {
            console.log({ ...getUrls.error }, "Error From Fetched URLs");
            return;
          }

          if (getUrls.data) {
            setUrls(getUrls.data.getAllUrl);
          }
          // console.log({ user,urls }, "User fetched Successfully");
        }
      } else {
        console.log({ user }, "From useEffect else");
      }
    })();
  }, []);

  return (
    <section className="pt-24">
      {!user ? (
        <p className="text-md md:text-lg leading-relaxed text-muted-foreground/80 w-fit mx-auto text-center">
          Create your first <span className="text-primary">Tini Tiny </span>
          URL from here <br /> and share with 8,300,000,000 billion people{" "}
          <br /> around the globe.
        </p>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">
              Your <span className="text-primary">Tiny Tiny</span> URLs
            </h2>
            {
              selectedUrls.length > 0 && (
                <Button variant="destructive" size="sm">
                  <Trash2 /> Delete All
                </Button>
              )
            }
           
          </div>

          <div className="space-y-4">
            {urls.map((url) => (
              <UrlCard key={url.id} {...url} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GeneratedUrlSection;
