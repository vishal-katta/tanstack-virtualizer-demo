import React from 'react';

interface ControlsProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  overscan: number;
  setOverscan: React.Dispatch<React.SetStateAction<number>>;
  itemHeight: number;
  setItemHeight: React.Dispatch<React.SetStateAction<number>>;
}

export function Controls({
  count,
  setCount,
  overscan,
  setOverscan,
  itemHeight,
  setItemHeight,
}: ControlsProps) {
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="font-medium text-slate-700 mb-3">Virtualization Settings</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-slate-600 mb-1">
            Item Count
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="count"
              type="range"
              min="100"
              max="50000"
              step="100"
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded w-20 text-center">
              {count.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="overscan" className="block text-sm font-medium text-slate-600 mb-1">
            Overscan
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="overscan"
              type="range"
              min="1"
              max="50"
              value={overscan}
              onChange={e => setOverscan(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded w-20 text-center">
              {overscan}
            </span>
          </div>
        </div>
        
        <div>
          <label htmlFor="itemHeight" className="block text-sm font-medium text-slate-600 mb-1">
            Item Height
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="itemHeight"
              type="range"
              min="40"
              max="200"
              value={itemHeight}
              onChange={e => setItemHeight(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded w-20 text-center">
              {itemHeight}px
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-slate-500">
        <p>
          TanStack Virtual only renders the items that are visible in the viewport (plus overscan),
          dramatically improving performance for large lists.
        </p>
      </div>
    </div>
  );
}