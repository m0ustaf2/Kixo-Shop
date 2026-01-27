import { Trash2, X } from "lucide-react";
import { useState } from "react";

export default function RemoveFromCartBtn({
  onRemove,
  productName,
  isLoading = false,
}: {
  onRemove: () => Promise<void>;
  productName: string;
  isLoading?: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5 duration-200">
        <button
          onClick={handleRemove}
          disabled={isLoading || isRemoving}
          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isRemoving || isLoading ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Removing...
            </>
          ) : (
            <>
              <Trash2 className="w-3.5 h-3.5" />
              Confirm
            </>
          )}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isRemoving}
          className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="group relative p-2 rounded-full hover:bg-red-50 transition-all duration-200 hover:scale-110"
      title={`Remove ${productName}`}
    >
      <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        Remove item
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
      </div>
    </button>
  );
}
