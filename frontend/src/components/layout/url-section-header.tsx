import { useUrls } from "@/hooks";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import ConfirmDeleteDialog from "@/components/shared/dialogs/confirm-delete-all";
const UrlSectionHeader  = ({
  updatedUrlsFetched,
  fetchUrlLoading,
}: {
  updatedUrlsFetched: () => void;
  fetchUrlLoading: boolean;
}) => {
  const { urls, selectedUrls } = useUrls();
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl">
        Your <span className="text-primary">Tiny Tiny</span> URLs
        {useUrls.length >= 5 ? (
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
        <ConfirmDeleteDialog />
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            onClick={updatedUrlsFetched}
            variant="outline"
            size="icon"
            title="Refresh URLs views"
          >
            <RefreshCw className={fetchUrlLoading ? "animate-spin" : ""} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UrlSectionHeader;
