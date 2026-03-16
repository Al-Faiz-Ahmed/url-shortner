import { useUrls, useUser } from "@/hooks";
import type { GeneratedURL } from "@/types";
import {
  EllipsisVertical,
  EyeIcon,
  Square,
  SquareCheck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@apollo/client/react";
import {
  DELETE_URL_BY_ID_MUTATION,
  type DeleteURLResponse,
  type DeleteURLVariables,
} from "@/graphql/mutations/gen-short-url";
import { toast } from "sonner";
import EditUrlDialog from "../shared/dialogs/edit-url";

const UrlCard = ({
  generatedURL,
  givenURL,
  id,
  isBlock,
  totalVisitors,
  uniqueHash,
  selectedURLIds,
  userId,
  expirationDate,
  createdAt,
  updatedAt,
}: GeneratedURL & { selectedURLIds: Set<string> }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { user, setUser } = useUser();
  const [deleteURLbyIdMutaion, { loading: deleteLoading }] = useMutation<
    DeleteURLResponse,
    DeleteURLVariables
  >(DELETE_URL_BY_ID_MUTATION);

  const { selectUrl, removeUrlByid, urls, selectedUrls } = useUrls();

  const urlsLength = urls.length;
  const selectedUrlsLength = selectedUrls.length;

  const selectionHandler = () => {
    if (isSelected) {
      selectUrl(id, "remove");
    } else {
      selectUrl(id);
    }
    setIsSelected((preState) => !preState);
  };



  const deleteHandler = async () => {
    console.log("deleteHandler");
    if (!user || deleteLoading) return;
    await deleteURLbyIdMutaion({
      variables: {
        userId: user?.id || "",
        urlId: id,
      },
      
    })
      .then((res) => {
        if(res.data?.deleteURLbyId.isDeleted){

          removeUrlByid(id);
          if(user){
            setUser({...user,totalShortenedURL:user.totalShortenedURL - 1})
          }
          toast.success(
            res.data?.deleteURLbyId.message || "URL deleted successfully",
          );
        }else{
          toast.error(res.data?.deleteURLbyId.message);
       
        }
      })
      .catch((err) => {
        toast.error(err.errors[0].message || "Something Went Wrong!");
     
      });
  };

  const editHandler = () => {
    setEditDialogOpen(true);
  };

  const urlForEdit: GeneratedURL | null = editDialogOpen
    ? {
        id,
        generatedURL,
        givenURL,
        uniqueHash,
        isBlock,
        totalVisitors,
        userId,
        expirationDate,
        createdAt,
        updatedAt,
      }
    : null;

  return (
    <div>
      <EditUrlDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        url={urlForEdit}
      />
      <div className={`flex border  ${isBlock ? "border-muted-foreground opacity-80": "border-gray-400"} p-3 py-2 rounded-md gap-3 items-center`}>
        <div className="p-0.5 self-start">
          {selectedUrlsLength !== urlsLength - 1 || selectedURLIds.has(id) ? (
            <button
              type="button"
              onClick={selectionHandler}
              aria-pressed={isSelected}
              className="cursor-pointer"
            >
              {isSelected ? (
                <SquareCheck className="text-primary size-5" />
              ) : (
                <Square className="text-muted-foreground size-5" />
              )}
            </button>
          ) : null}
        </div>
        <div>
          <a
            // href={generatedURL}
            href={`${import.meta.env.VITE_PUBLIC_URL}/${uniqueHash}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className={`${isBlock ? "text-muted-foreground": ""} mb-1 inline-block text-base`}
            rel="noreferrer"
          >
            {generatedURL}
          </a>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {givenURL.length < 35 ? givenURL : givenURL.slice(0, 35) + "..."}
          </p>
        </div>
        <div className="flex ml-auto items-center gap-x-4 font-sans">
          <div className="text-xs bg-primary-800 text-primary rounded-full px-2 py-1">
            {totalVisitors < 1 ? (
              <div
                title={totalVisitors + " View"}
                className="flex items-center gap-1"
              >
                {" "}
                0 <EyeIcon strokeWidth="1.5px" className="size-4" />
              </div>
            ) : (
              <div
                title={totalVisitors + " Views"}
                className="flex items-center gap-1"
              >
                {totalVisitors}{" "}
                <EyeIcon strokeWidth="1.5px" className="size-4" />
              </div>
            )}
          </div>
          {selectedUrlsLength < 1 && (
            <UrlCardActions isBlock={isBlock} onDelete={deleteHandler} onEdit={editHandler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlCard;

const UrlCardActions = ({
  onDelete,
  onEdit,
  isBlock
}: {
  onDelete: () => void;
  onEdit: () => void;
  isBlock:boolean
}) => {
  const { urls } = useUrls();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical className={isBlock ? "text-muted-foreground": ""} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onMouseUp={onEdit} className="cursor-pointer">
            Edit
          </DropdownMenuItem>
          {urls && urls.length > 1 && (
            <DropdownMenuItem
              onMouseUp={onDelete}
              className="cursor-pointer"
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
