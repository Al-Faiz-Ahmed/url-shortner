import { useUrls, useUser } from "@/hooks";
import type { GeneratedURL } from "@/types";
import {
  Check,
  Ellipsis,
  EllipsisVertical,
  Square,
  SquareCheck,
  SquarePen,
  Trash,
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

const UrlCard = ({ generatedURL, givenURL, id }: GeneratedURL) => {
  const [isSelected, setIsSelected] = useState(false);
  const { user } = useUser();
  const [deleteURLbyIdMutaion,  {loading:deleteLoading}] = useMutation<
    DeleteURLResponse,
    DeleteURLVariables
  >(DELETE_URL_BY_ID_MUTATION);

  const { selectUrl, removeUrlByid } = useUrls();

  const selectionHandler = () => {
    console.log;

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
        removeUrlByid(id);
        toast.success(
          res.data?.deleteURLbyId.message ||
            "URL deleted successfully",
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHandler = () => {
    console.log("editHandler");
  };

  return (
    <div>
      <div className="flex border border-gray-400 p-3 py-2 rounded-md gap-3 items-center">
        <div className="p-0.5 self-start">
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
        </div>
        <div>
          <a
            href={generatedURL}
            target="_blank"
            referrerPolicy="no-referrer"
            className="mb-1 inline-block text-base"
            rel="noreferrer"
          >
            {generatedURL}
          </a>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {givenURL.length < 35 ? givenURL : givenURL.slice(0, 35) + "..."}
          </p>
        </div>
        <div className="flex ml-auto">
          <UrlCardActions onDelete={deleteHandler} onEdit={editHandler} />
        </div>
      </div>
    </div>
  );
};

export default UrlCard;

const UrlCardActions = ({
  onDelete,
  onEdit,
}: {
  onDelete: () => void;
  onEdit: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onMouseUp={onEdit} className="cursor-pointer">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onMouseUp={onDelete}
            className="cursor-pointer"
            variant="destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
