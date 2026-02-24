import { useUrls } from "@/hooks";
import type { GeneratedURL } from "@/types";
import { Check, Square, SquareCheck, SquarePen, Trash } from "lucide-react";
import { useState } from "react";

const UrlCard = ({ generatedURL, givenURL,id }: GeneratedURL) => {
  const [isSelected,setIsSelected] = useState(false)
  const {selectUrl}  = useUrls();

  const selectionHandler = () => {
    setIsSelected(true)
    selectUrl(id)
  }
  return (
    <div>
      <div className="flex border border-gray-400 p-3 py-2 rounded-md gap-3">
        <div>
          <button
            type="button"
            onClick={selectionHandler}
            // className="absolute top-3 right-3"
            aria-pressed={isSelected}
          >
            {isSelected ? (
              <SquareCheck className="text-primary" />
            ) : (
              <Square className="text-muted-foreground" />
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
          <p className="text-muted-foreground text-xs">{givenURL}</p>
        </div>
        <div className="flex">
          <button className="">
            <Trash />
          </button>
          <button className="">
            <SquarePen />
          </button>
          <button className=""></button>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
