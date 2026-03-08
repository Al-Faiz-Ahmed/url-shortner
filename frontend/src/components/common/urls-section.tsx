import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useLocalStorage, useUrls, useUser } from "@/hooks";
import { useLazyQuery } from "@apollo/client/react";
import { RefreshCw } from "lucide-react";

import { useEffect } from "react";
import { Button } from "../ui/button";
import UrlCard from "./url-card";
import {
  GET_URL_BY_ID_QUERY,
  type GetUrlsResponse,
  type GetUrlsVariables,
} from "@/graphql/queries/get-urls";

import { toast } from "sonner";

import { STORAGE_KEYS } from "@/utils/constants";
import type { GeneratedURL } from "@/types";
import ConfirmDeleteDialog from "../shared/dialogs/confirm-delete-all";
import UrlSectionHeader from "../layout/url-section-header";

const GeneratedUrlSection = () => {
  const [re_fetch_timer, set_refetch_timer] = useLocalStorage(
    STORAGE_KEYS.RE_FETCH_THROTTLE,
    0,
  );
  const [fetchUser] = useLazyQuery<GetUserResponse, GetUserVariables>(
    GET_USER_QUERY,
  );
  const [fetchUrls, { loading: fetchUrlLoading }] = useLazyQuery<
    GetUrlsResponse,
    GetUrlsVariables
  >(GET_URL_BY_ID_QUERY, { fetchPolicy: "no-cache" });

  const { user, setUser } = useUser();
  const { urls, setUrls, selectedUrls } = useUrls();

  const newSelectedURLset = new Set(selectedUrls);

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
      } else if (user && urls.length < 1) {
        const userId = user.id;
        const getUrls = await fetchUrls({ variables: { userId } });

        if (getUrls.error) {
          console.log({ ...getUrls.error }, "Error From Fetched URLs");
          return;
        }

        if (getUrls.data) {
          setUrls(getUrls.data.getAllUrl);
        }
      }
    })();
  }, []);

  const updatedUrlsFetched = async () => {
    console.log("updatedFetch", user, fetchUrlLoading);

    if (!user || fetchUrlLoading) return;

    const currentTimeStamp = Date.now();

    const throttle_time = (currentTimeStamp - re_fetch_timer) / 1000;
    if (re_fetch_timer === 0 || throttle_time >= 90) {
      await fetchUrls({ variables: { userId: user.id } })
        .then((res) => {
          if (res.data) {
            setUrls(res.data?.getAllUrl);
          }
        })
        .catch((err) => {
          toast(err.errors[0].message || "Something Went Wrong!");
        })
        .finally(() => {
          set_refetch_timer(Date.now());
        });
    } else {
      toast(
        `Wait till ${Math.ceil(90 - throttle_time)} Secs For Next Urls Refresh `,
      );
    }
  };

  let blockedUrls: GeneratedURL[] = [];
  let workingUrls: GeneratedURL[] = [];
  urls.forEach((url) => {
    if (url.isBlock) {
      blockedUrls.push(url);
    } else {
      workingUrls.push(url);
    }
  });

  return (
    <section className="pt-20  px-4">
      {!user || urls.length < 1 ? (
        <p className="text-md md:text-lg leading-relaxed text-muted-foreground/80 w-fit mx-auto text-center">
          Create your first <span className="text-primary">Tini Tiny </span>
          URL from here <br /> and share with 8,300,000,000 billion people{" "}
          <br /> around the globe.
        </p>
      ) : (
        <div>
          <UrlSectionHeader
            fetchUrlLoading={fetchUrlLoading}
            updatedUrlsFetched={updatedUrlsFetched}
          />
          

          <div className="space-y-4 mb-6">
            {workingUrls.map((url) => (
              <UrlCard
                key={url.id}
                {...url}
                selectedURLIds={newSelectedURLset}
              />
            ))}
          </div>

          {blockedUrls.length > 0 && (
            <>
              <p className="text-primary mb-3 text-lg">Blocked Urls</p>
              <div className="space-y-4">
                {blockedUrls.map((url) => (
                  <UrlCard
                    key={url.id}
                    {...url}
                    selectedURLIds={newSelectedURLset}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default GeneratedUrlSection;
