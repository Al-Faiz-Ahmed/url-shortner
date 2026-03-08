import React from "react";
import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { useUrls, useUser } from "@/hooks";
import { useMutation } from "@apollo/client/react";
import {
  DELETE_MULTIPLE_URL_BY_ID_MUTATION,
  type DeleteMultipleURLResponse,
  type DeleteMultipleURLVariables,
} from "@/graphql/mutations/gen-short-url";
import { toast } from "sonner";

const ConfirmDeleteDialog = () => {
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

export default ConfirmDeleteDialog