import React, { useState, useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, ChevronUp } from 'lucide-react';
import clsx from 'clsx';
import { faker } from '../utils/faker';

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface VirtualGridProps {
  items: Item[];
  parentRef: React.RefObject<HTMLDivElement>;
}

export function VirtualGrid({ items, parentRef }: VirtualGridProps) {
  // Track expanded state for grid items
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [itemHeights, setItemHeights] = useState<Record<number, number>>({});
  
  // Calculate number of columns based on container width
  const columnCount = useRef(3);
  
  // Update column count on resize
  React.useEffect(() => {
    const updateColumnCount = () => {
      if (parentRef.current) {
        const width = parentRef.current.offsetWidth;
        if (width < 640) columnCount.current = 1;
        else if (width < 1024) columnCount.current = 2;
        else columnCount.current = 3;
      }
    };
    
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [parentRef]);
  
  // Calculate row count
  const rowCount = Math.ceil(items.length / columnCount.current);
  
  // Create a virtualizer for the grid with dynamic sizing
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback((index) => {
      const rowItems = items.slice(index * columnCount.current, (index + 1) * columnCount.current);
      const maxHeight = Math.max(...rowItems.map(item => itemHeights[item.id] || 300));
      return maxHeight;
    }, [items, itemHeights, columnCount]),
    overscan: 5,
    measureElement: useCallback((element) => {
      return element.getBoundingClientRect().height;
    }, []),
  });

  const toggleExpand = (itemId: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Handle height changes for grid items
  const handleItemHeightChange = useCallback((itemId: number, height: number) => {
    setItemHeights(prev => {
      if (prev[itemId] === height) return prev;
      return { ...prev, [itemId]: height };
    });
  }, []);
  
  return (
    <div 
      ref={parentRef}
      className="h-[600px] overflow-auto border border-slate-200 rounded-lg bg-slate-50"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            className="absolute left-0 right-0 grid gap-4 px-4"
            style={{
              gridTemplateColumns: `repeat(${columnCount.current}, 1fr)`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {Array.from({ length: columnCount.current }).map((_, columnIndex) => {
              const itemIndex = virtualRow.index * columnCount.current + columnIndex;
              const item = items[itemIndex];
              
              if (!item) return null;
              
              const isExpanded = expandedItems.has(item.id);
              
              return (
                <div
                  key={item.id}
                  className={clsx(
                    "bg-white rounded-lg border transition-all duration-200 overflow-hidden flex flex-col cursor-pointer",
                    isExpanded ? "border-blue-200 shadow-md" : "border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
                  )}
                  onClick={() => toggleExpand(item.id)}
                  ref={el => {
                    if (el) {
                      const height = el.getBoundingClientRect().height;
                      handleItemHeightChange(item.id, height);
                    }
                  }}
                >
                  <div 
                    className="h-24 w-full"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                      {item.id}
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 truncate">
                        {item.title}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <p className={clsx(
                      "text-sm text-slate-600 transition-all duration-200",
                      isExpanded ? "" : "line-clamp-3"
                    )}>
                      {item.description}
                    </p>
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">
                          Additional Details
                        </h4>
                        <p className="text-sm text-slate-600">
                          {faker.generateParagraph(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}