import React from "react";

export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-[#290D04]/5 ${className}`}>
      <div className="h-48 rounded-t-2xl bg-[#290D04]/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#290D04]/10 rounded w-3/4" />
        <div className="h-3 bg-[#290D04]/10 rounded w-full" />
        <div className="h-3 bg-[#290D04]/10 rounded w-1/2" />
      </div>
    </div>
  );
}