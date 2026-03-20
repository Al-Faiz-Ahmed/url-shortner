import { useCopyToClipboard, useUrls, useUser } from "@/hooks";
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
import ConfirmDeleteUrlDialog from "../shared/dialogs/confirm-delete-url";
import { envConfig } from "@/config/env-config";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { user, setUser } = useUser();
  const [deleteURLbyIdMutaion, { loading: deleteLoading }] = useMutation<
    DeleteURLResponse,
    DeleteURLVariables
  >(DELETE_URL_BY_ID_MUTATION);

  const { selectUrl, removeUrlByid, urls, selectedUrls } = useUrls();
  const {copy}  = useCopyToClipboard()

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

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const copyHandler = () => {
      copy(`${envConfig.FRONTEND_SITE_URL}/${uniqueHash}`).then(()=>{
        toast.success("URL Copied")
      })
  }

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
      <ConfirmDeleteUrlDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          deleteHandler();
          setDeleteDialogOpen(false);
        }}
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
                <SquareCheck className="text-primary size-4 sm:size-5" />
              ) : (
                <Square className="text-muted-foreground size-4 sm:size-5" />
              )}
            </button>
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <a
            // href={generatedURL}
            href={`${envConfig.FRONTEND_SITE_URL}/${uniqueHash}`}
            target="_blank"
            referrerPolicy="no-referrer"
            className={`${isBlock ? "text-muted-foreground": ""} mb-1 inline-block text-sm sm:text-base`}
            rel="noreferrer"
          >
            {`${envConfig.FRONTEND_SITE_URL}/${uniqueHash}`}
           
          </a>
          
          <p className="text-muted-foreground text-xs truncate w-full max-w-[28ch] sm:max-w-[32ch]">
            {givenURL}
          </p>
        </div>
        <div className="flex ml-auto items-center gap-x-4 font-sans">
          <div className="text-xs bg-primary-800 text-primary rounded-full px-2 py-1 hidden sm:block">
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
            <UrlCardActions
              onCopytoCB={copyHandler}
              totalVisitors={totalVisitors}
              isBlock={isBlock}
              onDelete={openDeleteDialog}
              onEdit={editHandler}
            />
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
  isBlock,
  onCopytoCB,
  totalVisitors
}: {
  onDelete: () => void;
  onEdit: () => void;
  onCopytoCB: () => void;
  isBlock:boolean
  totalVisitors:number
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
        <DropdownMenuGroup className="divide-y divide-muted-foreground/30 ">
          <DropdownMenuItem onMouseUp={onEdit} className="cursor-pointer rounded-none sm:hidden">
            Views <span className="inline-flex ml-auto text-primary">{totalVisitors}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onMouseUp={onCopytoCB} className="cursor-pointer rounded-none">
            Copy Url
          </DropdownMenuItem>
          <DropdownMenuItem onMouseUp={onEdit} className="cursor-pointer rounded-none">
            Edit
          </DropdownMenuItem>
          {urls && urls.length > 1 && (
            <DropdownMenuItem
              onMouseUp={onDelete}
              className="cursor-pointer "
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
