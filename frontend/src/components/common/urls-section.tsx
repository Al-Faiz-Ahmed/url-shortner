import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useLocalStorage, useUrls, useUser } from "@/hooks";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { RefreshCw, Trash2 } from "lucide-react";

import { useEffect } from "react";
import { Button } from "../ui/button";
import UrlCard from "./url-card";
import {
  GET_URL_BY_ID_QUERY,
  type GetUrlsResponse,
  type GetUrlsVariables,
} from "@/graphql/queries/get-urls";
import {
  DELETE_MULTIPLE_URL_BY_ID_MUTATION,
  type DeleteMultipleURLResponse,
  type DeleteMultipleURLVariables,
} from "@/graphql/mutations/gen-short-url";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { STORAGE_KEYS } from "@/utils/constants";
import type { GeneratedURL } from "@/types";

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

  const [deleteMultipleURlById, { loading: deleteLoading }] = useMutation<
    DeleteMultipleURLResponse,
    DeleteMultipleURLVariables
  >(DELETE_MULTIPLE_URL_BY_ID_MUTATION);

  const { user, setUser } = useUser();
  const {
    urls,
    setUrls,
    selectedUrls,
    removeAllSelectedUrl,
    removeMultipleURLS,
  } = useUrls();

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

  const handleDeleteAll = async () => {
    console.log("deleteHandler");

    if (!user || deleteLoading) return;

    const cloneSelectedURL = [...selectedUrls];

    await deleteMultipleURlById({
      variables: {
        userId: user?.id || "",
        urlsId: selectedUrls,
      },
    })
      .then((res) => {
        if (res?.data?.deleteMultipleURLbyId?.isDeleted) {
          toast.success("All Selected URL deleted successfully");
          removeAllSelectedUrl();
          removeMultipleURLS(cloneSelectedURL);
          if (user) {
            setUser({
              ...user,
              totalShortenedURL:
                user.totalShortenedURL - cloneSelectedURL.length,
            });
          }
        } else {
          toast.error(res.data?.deleteMultipleURLbyId.message);
        }
      })
      .catch((err) => {
        toast.error(err.errors[0].message || "Something Went Wrong!");
      });
  };

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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl">
              Your <span className="text-primary">Tiny Tiny</span> URLs
              {urls.length >= 5 ? (
                <div className="text-sm font-sans mt-2 text-white">
                  Free URL generations limit exceeded.
                </div>
              ) : (
                <div className="text-sm font-sans mt-2 text-muted-foreground">
                  You have{" "}
                  <span className="text-white font-medium">
                    {" "}
                    {5 - urls.length} FREE
                  </span>{" "}
                  URL generations remaining.
                </div>
              )}
            </h2>
            {selectedUrls.length > 0 ? (
              <ConfirmDeleteDialog
                handleDeleteAll={handleDeleteAll}
                deleteLoading={deleteLoading}
              />
            ) : (
              <div className="flex gap-2 items-center">
                <Button
                  onClick={updatedUrlsFetched}
                  variant="outline"
                  size="icon"
                  title="Refresh URLs views"
                >
                  <RefreshCw
                    className={fetchUrlLoading ? "animate-spin" : ""}
                  />
                </Button>
              </div>
            )}
          </div>

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

const ConfirmDeleteDialog = ({
  handleDeleteAll,
  deleteLoading,
}: {
  handleDeleteAll: () => void;
  deleteLoading: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // onMouseUp={handleDeleteAll}
          className="cursor-pointer"
          variant="destructive"
          size="sm"
          title={`${deleteLoading}`}
          disabled={deleteLoading}
        >
          <Trash2 /> Delete All
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your all
            selected URLs data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onMouseUp={handleDeleteAll}
            className="cursor-pointer"
            variant="destructive"
            size="sm"
            title={`${deleteLoading}`}
            disabled={deleteLoading}
          >
            <Trash2 /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
