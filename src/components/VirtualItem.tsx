import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { faker } from "../utils/faker";

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface VirtualItemProps {
  item: Item;
}

export function VirtualItem({
  item,
}: VirtualItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={clsx(
        "m-2 p-4 bg-white rounded-lg border border-slate-200",
        "hover:border-slate-300 shadow-sm hover:shadow",
        "transition-all duration-200 overflow-hidden cursor-pointer",
        isExpanded ? "border-blue-200 shadow-md" : ""
      )}
      onClick={toggleExpand}
    >
      <div className="flex items-start">
        <div
          className="w-12 h-12 rounded-md mr-4 flex-shrink-0"
          style={{ backgroundColor: item.color }}
        >
          <div className="w-full h-full flex items-center justify-center text-white font-bold">
            {item.id}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 truncate">
              {item.title}
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <p
            className={clsx(
              "text-sm text-slate-600 transition-all duration-200",
              isExpanded ? "" : "line-clamp-2"
            )}
          >
            {item.description}
          </p>
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                Additional Details
              </h4>
              <p className="text-sm text-slate-600">
                {faker.generateParagraph(3)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
