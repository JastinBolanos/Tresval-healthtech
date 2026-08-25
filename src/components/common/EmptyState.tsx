import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-[#E9E9E2] ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#F4F3EE] flex items-center justify-center text-[#4A5D4E] mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-serif font-bold text-base text-[#2D332D] mb-1">{title}</h3>
      <p className="text-xs text-[#6B705C] max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#4A5D4E] text-white rounded-xl text-xs font-semibold hover:bg-[#3D4C40] transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
