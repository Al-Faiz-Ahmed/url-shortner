import {
  GET_USER_QUERY,
  type GetUserResponse,
  type GetUserVariables,
} from "@/graphql/queries/get-user";
import { useUrlActions, useUrls, useUser } from "@/hooks";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { Trash2 } from "lucide-react";

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

const GeneratedUrlSection = () => {
  const [fetchUser] = useLazyQuery<GetUserResponse, GetUserVariables>(
    GET_USER_QUERY,
  );
  const [fetchUrls] = useLazyQuery<GetUrlsResponse, GetUrlsVariables>(
    GET_URL_BY_ID_QUERY,
  );

  const [deleteMultipleURlById, { loading: deleteLoading }] = useMutation<
    DeleteMultipleURLResponse,
    DeleteMultipleURLVariables
  >(DELETE_MULTIPLE_URL_BY_ID_MUTATION);

  const { user, setUser } = useUser();
  const { urls, setUrls, selectedUrls, removeAllSelectedUrl, removeMultipleURLS } =
    useUrls();

  const newSelectedURLset = new Set(selectedUrls);

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
        // removeUrlByid(id);
        removeAllSelectedUrl();
        removeMultipleURLS(cloneSelectedURL);
        toast.success(
          res.data?.deleteMultipleURLbyId.message ||
            "All Selected URL deleted successfully",
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="pt-24  px-4">
      {!user || urls.length < 1 ? (
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
            {selectedUrls.length > 0 ? (
              <Button
                onMouseUp={handleDeleteAll}
                className="cursor-pointer"
                variant="destructive"
                size="sm"
              >
                <Trash2 /> Delete All
              </Button>
            ) : (
              <div>{urls.length}/5</div>
            )}
          </div>

          <div className="space-y-4">
            {urls.map((url) => (
              <UrlCard
                key={url.id}
                {...url}
                selectedURLIds={newSelectedURLset}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GeneratedUrlSection;
