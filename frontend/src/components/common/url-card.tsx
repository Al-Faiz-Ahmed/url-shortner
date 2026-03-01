import { useUrls } from "@/hooks";
import type { GeneratedURL } from "@/types";
import { Check, Square, SquareCheck, SquarePen, Trash } from "lucide-react";
import { useState } from "react";

const UrlCard = ({ generatedURL, givenURL,id }: GeneratedURL) => {
  const [isSelected,setIsSelected] = useState(false)
  const {selectUrl}  = useUrls();

  const selectionHandler = () => {
  console.log

    if(isSelected){
      selectUrl(id,"remove")
    }else{
      selectUrl(id)
    }
    setIsSelected(preState => !preState)
  }
  return (
    <div>
      <div className="flex border border-gray-400 p-3 py-2 rounded-md gap-3">
        <div className="p-0.5">
          <button
            type="button"
            onClick={selectionHandler}
            aria-pressed={isSelected}
            className="cursor-pointer"
          >
            {isSelected ? (
              <SquareCheck  className="text-primary size-5" />
            ) : (
              <Square  className="text-muted-foreground size-5" />
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
          <p className="text-muted-foreground text-xs line-clamp-1">{givenURL.length < 35 ? givenURL : givenURL.slice(0,35) + "..."}</p>
        
        </div>
        <div className="flex ml-auto">
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
