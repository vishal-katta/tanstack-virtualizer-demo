import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ChevronDown,
  ChevronUp,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { generateItems } from "../utils/data";
import { Controls } from "./Controls";
import { VirtualGrid } from "./VirtualGrid";
import { VirtualItem } from "./VirtualItem";

export function VirtualDemo() {
  const [count, setCount] = useState(10000);
  const [overscan, setOverscan] = useState(10);
  const [itemHeight, setItemHeight] = useState(80);
  const [showControls, setShowControls] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Reference to the scrollable container element
  const parentRef = useRef<HTMLDivElement>(null);

  // Generate a large list of items
  const allItems = useMemo(() => generateItems(count), [count]);

  // Filter and sort items based on the search query and sort direction
  const filteredItems = useMemo(() => {
    let items = allItems;

    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortDirection) {
      items = [...items].sort((a, b) => {
        if (sortDirection === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    return items;
  }, [allItems, searchQuery, sortDirection]);

  // Create a virtualizer for the list with dynamic sizing
  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    estimateSize: () => 100,
    getScrollElement: () => parentRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Toggle sort direction
  const toggleSort = useCallback(() => {
    setSortDirection((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              Virtual Scrolling Demo
            </h2>
            <button
              onClick={() => setShowControls((prev) => !prev)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-600" />
              <span>Controls</span>
            </button>
          </div>

          {showControls && (
            <Controls
              count={count}
              setCount={setCount}
              overscan={overscan}
              setOverscan={setOverscan}
              itemHeight={itemHeight}
              setItemHeight={setItemHeight}
            />
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleSort}
                className="flex items-center space-x-1 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span>Sort</span>
                {sortDirection === "asc" && <ChevronUp className="h-4 w-4" />}
                {sortDirection === "desc" && (
                  <ChevronDown className="h-4 w-4" />
                )}
                {sortDirection === null && (
                  <span className="text-slate-400">-</span>
                )}
              </button>

              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center justify-center p-2 ${
                    viewMode === "list"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center justify-center p-2 ${
                    viewMode === "grid"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="mb-4 text-slate-600">
          {filteredItems.length > 0
            ? `Showing ${filteredItems.length.toLocaleString()} items (only rendering ${
                virtualItems.length
              } in DOM)`
            : "No items found"}
        </p>

        {viewMode === "list" ? (
          <div
            ref={parentRef}
            className="h-[600px] overflow-auto border border-slate-200 rounded-lg bg-slate-50"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              <div
                className="absolute top-0 left-0 w-full"
                style={{
                  transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
                }}
              >
                {virtualItems.map(({ index, key }) => {
                  const card = filteredItems[index];
                  return (
                    <div
                      key={key}
                      className=""
                      data-index={index}
                      ref={virtualizer.measureElement}
                    >
                      <VirtualItem item={card} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <VirtualGrid items={filteredItems} parentRef={parentRef} />
        )}
      </div>
    </div>
  );
}
