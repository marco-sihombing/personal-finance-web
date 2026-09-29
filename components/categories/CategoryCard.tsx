"use client";

import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const isGlobal = category.userId === null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-yellow-100 bg-yellow-50/40 p-4 transition hover:bg-yellow-100/60 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-gray-900">
          {category.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          {category.categoryType === "income" ? "Income" : "Expense"}
          {" • "}
          <span
            className={
              isGlobal ? "font-medium text-amber-700" : "text-gray-500"
            }
          >
            {isGlobal ? "Default" : "Personal"}
          </span>
        </p>
      </div>

      {!isGlobal && (
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => onEdit(category)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="rounded-lg bg-red-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
